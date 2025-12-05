import { Difficulty, MathProblem } from '../types';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateProblem = (difficulty: Difficulty): MathProblem => {
  let parts: number[] = [];
  let operators: string[] = [];
  let expression = "";
  let answer = 0;
  let valid = false;

  while (!valid) {
    parts = [];
    operators = [];
    
    if (difficulty === Difficulty.SIMPLE) {
      // 10以内加减法
      const a = getRandomInt(0, 10);
      const b = getRandomInt(0, 10);
      const isPlus = Math.random() > 0.5;
      
      if (isPlus) {
        if (a + b <= 10) {
          parts = [a, b];
          operators = ['+'];
          answer = a + b;
          expression = `${a} + ${b} = ?`;
          valid = true;
        }
      } else {
        // Subtraction
        if (a - b >= 0) {
          parts = [a, b];
          operators = ['-'];
          answer = a - b;
          expression = `${a} - ${b} = ?`;
          valid = true;
        }
      }
    } else if (difficulty === Difficulty.MEDIUM) {
      // 20以内加减法
      const a = getRandomInt(0, 20);
      const b = getRandomInt(0, 20);
      const isPlus = Math.random() > 0.5;

      if (isPlus) {
        if (a + b <= 20) {
          parts = [a, b];
          operators = ['+'];
          answer = a + b;
          expression = `${a} + ${b} = ?`;
          valid = true;
        }
      } else {
        if (a - b >= 0) {
          parts = [a, b];
          operators = ['-'];
          answer = a - b;
          expression = `${a} - ${b} = ?`;
          valid = true;
        }
      }
    } else {
      // 20以内 3个数加减
      const a = getRandomInt(0, 15);
      const b = getRandomInt(0, 15);
      const c = getRandomInt(0, 15);
      
      const op1 = Math.random() > 0.5 ? '+' : '-';
      const op2 = Math.random() > 0.5 ? '+' : '-';
      
      let tempResult = op1 === '+' ? a + b : a - b;
      
      // Check intermediate steps to avoid negative numbers for kids
      if (tempResult >= 0 && tempResult <= 20) {
        let finalResult = op2 === '+' ? tempResult + c : tempResult - c;
        
        if (finalResult >= 0 && finalResult <= 20) {
          parts = [a, b, c];
          operators = [op1, op2];
          answer = finalResult;
          expression = `${a} ${op1} ${b} ${op2} ${c} = ?`;
          valid = true;
        }
      }
    }
  }

  return { expression, answer, parts, operators };
};