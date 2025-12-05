import { GoogleGenAI } from "@google/genai";
import { Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRewardMessage = async (score: number, difficulty: Difficulty): Promise<string> => {
  try {
    const diffText = difficulty === Difficulty.SIMPLE ? "简单" : difficulty === Difficulty.MEDIUM ? "中等" : "挑战";
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a cheerful, magical forest owl speaking to a 6-year-old child. 
      The child just finished a math quiz of ${diffText} level and got ${score} questions right.
      
      Write a VERY SHORT (max 20 words), funny, and encouraging praise in Chinese. 
      Use simple words. Mention something magical like stars, rainbows, or forest animals.
      Example: "哇！你真棒！森林里的小松鼠都为你鼓掌啦！"`,
    });

    return response.text || "太棒了！你是数学小天才！";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "哇！你做得真好！继续加油！";
  }
};