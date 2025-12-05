import React, { useEffect, useState } from 'react';
import { Difficulty } from '../types';
import { generateRewardMessage } from '../services/geminiService';
import { Button } from './Button';

interface RewardScreenProps {
  score: number;
  total: number;
  difficulty: Difficulty;
  onRestart: () => void;
  onHome: () => void;
}

export const RewardScreen: React.FC<RewardScreenProps> = ({ score, total, difficulty, onRestart, onHome }) => {
  const [message, setMessage] = useState<string>("正在召唤魔法猫头鹰...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    generateRewardMessage(score, difficulty).then((msg) => {
      if (isMounted) {
        setMessage(msg);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [score, difficulty]);

  const percentage = (score / total) * 100;
  let animalImage = "https://picsum.photos/200/200?random=1";
  
  if (percentage === 100) animalImage = "https://picsum.photos/seed/happy/200/200";
  else if (percentage > 60) animalImage = "https://picsum.photos/seed/good/200/200";
  else animalImage = "https://picsum.photos/seed/try/200/200";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center space-y-6 animate-fade-in">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">挑战完成!</h1>
      
      <div className="relative">
        <img 
          src={animalImage} 
          alt="Result Animal" 
          className="w-48 h-48 rounded-full border-8 border-yellow-300 shadow-2xl"
        />
        {percentage === 100 && (
          <div className="absolute -top-4 -right-4 text-6xl animate-bounce">🏆</div>
        )}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-xl max-w-md w-full border-2 border-purple-100">
        <p className="text-2xl text-gray-700 font-bold mb-2">
          得分: <span className="text-green-500 text-4xl">{score}</span> / {total}
        </p>
        
        <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200 min-h-[100px] flex items-center justify-center">
           {loading ? (
             <span className="text-gray-400 text-lg animate-pulse">✨ 魔法猫头鹰正在想...</span>
           ) : (
             <p className="text-xl text-purple-700 font-medium italic">"{message}"</p>
           )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Button onClick={onHome} color="yellow" size="md">🏠 回家</Button>
        <Button onClick={onRestart} color="green" size="md">🔄 再玩一次</Button>
      </div>
    </div>
  );
};