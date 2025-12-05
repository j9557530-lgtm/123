import React, { useState, useEffect } from 'react';
import { Difficulty, GameState, MathProblem } from './types';
import { generateProblem } from './services/mathGen';
import { Button } from './components/Button';
import { NumberPad } from './components/NumberPad';
import { RewardScreen } from './components/RewardScreen';

// Constants
const QUESTIONS_PER_ROUND = 5;

const App: React.FC = () => {
  // Game State
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.SIMPLE);
  
  // Round State
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  // Interaction State
  const [inputValue, setInputValue] = useState<string>("");
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [shake, setShake] = useState(false);

  // Initialize Game
  const startGame = (diff: Difficulty) => {
    const newProblems = Array.from({ length: QUESTIONS_PER_ROUND }, () => generateProblem(diff));
    setProblems(newProblems);
    setDifficulty(diff);
    setCurrentProblemIndex(0);
    setScore(0);
    setInputValue("");
    setFeedback('none');
    setGameState(GameState.PLAYING);
  };

  const handleInput = (num: number) => {
    if (inputValue.length < 2) { // Limit to 2 digits for simple math
      setInputValue(prev => prev + num.toString());
    }
  };

  const handleDelete = () => {
    setInputValue(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (inputValue === "") return;
    
    const currentProblem = problems[currentProblemIndex];
    const playerAnswer = parseInt(inputValue, 10);
    
    if (playerAnswer === currentProblem.answer) {
      // Correct
      setFeedback('correct');
      setTimeout(() => {
        if (currentProblemIndex + 1 < QUESTIONS_PER_ROUND) {
          setScore(s => s + 1);
          setCurrentProblemIndex(prev => prev + 1);
          setInputValue("");
          setFeedback('none');
        } else {
          setScore(s => s + 1);
          setGameState(GameState.REWARD);
        }
      }, 1000); // Wait 1s for celebration
    } else {
      // Wrong
      setFeedback('wrong');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setInputValue("");
    }
  };

  // Render Menu
  if (gameState === GameState.MENU) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-green-100 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 text-6xl opacity-20">☁️</div>
        <div className="absolute top-20 right-20 text-6xl opacity-20">☀️</div>
        <div className="absolute bottom-10 left-20 text-6xl opacity-20">🌳</div>
        
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[3rem] shadow-2xl border-4 border-white max-w-lg w-full text-center z-10">
          <h1 className="text-5xl font-black text-blue-600 mb-2 tracking-wide">数学大冒险</h1>
          <p className="text-xl text-gray-500 mb-10">Math Adventure</p>
          
          <div className="flex flex-col gap-6 w-full px-4">
            <Button 
              onClick={() => startGame(Difficulty.SIMPLE)} 
              color="green" 
              size="lg"
            >
              🐣 简单 (10以内)
            </Button>
            <Button 
              onClick={() => startGame(Difficulty.MEDIUM)} 
              color="blue" 
              size="lg"
            >
              🐰 中等 (20以内)
            </Button>
            <Button 
              onClick={() => startGame(Difficulty.HARD)} 
              color="purple" 
              size="lg"
            >
              🦁 挑战 (3个数)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render Reward
  if (gameState === GameState.REWARD) {
    return (
      <RewardScreen 
        score={score} 
        total={QUESTIONS_PER_ROUND} 
        difficulty={difficulty}
        onRestart={() => startGame(difficulty)}
        onHome={() => setGameState(GameState.MENU)}
      />
    );
  }

  // Render Game
  const currentProblem = problems[currentProblemIndex];
  
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-slate-50">
      {/* Header / Progress */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8 pt-4">
        <Button onClick={() => setGameState(GameState.MENU)} color="yellow" size="sm">
          ↩ 退出
        </Button>
        <div className="flex gap-2">
          {problems.map((_, idx) => (
            <div 
              key={idx}
              className={`w-4 h-4 rounded-full ${
                idx < currentProblemIndex ? 'bg-green-500' : 
                idx === currentProblemIndex ? 'bg-blue-400 animate-pulse' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="text-2xl font-bold text-yellow-500">
           ⭐ {score}
        </div>
      </div>

      {/* Main Game Area */}
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        
        {/* Question Card */}
        <div className={`
          relative bg-white w-full rounded-[2.5rem] p-10 shadow-xl border-4 
          flex items-center justify-center min-h-[200px]
          transition-all duration-300
          ${feedback === 'correct' ? 'border-green-400 scale-105 bg-green-50' : 
            feedback === 'wrong' ? 'border-red-400 bg-red-50' : 'border-blue-100'}
          ${shake ? 'shake' : ''}
        `}>
          {feedback === 'correct' && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl animate-bounce">
              ✨🎉✨
            </div>
          )}
          
          <h2 className="text-6xl font-black text-gray-700 tracking-wider">
            {currentProblem.expression.replace('?', '')}
            <span className={`${inputValue ? 'text-blue-600' : 'text-gray-300'} border-b-4 border-gray-300 px-4 min-w-[80px] inline-block text-center`}>
              {inputValue || '?'}
            </span>
          </h2>
        </div>

        {/* Feedback Message */}
        <div className="h-8">
           {feedback === 'wrong' && (
             <p className="text-red-500 font-bold text-xl animate-pulse">再试一次哦！💪</p>
           )}
           {feedback === 'correct' && (
             <p className="text-green-600 font-bold text-xl">答对啦！真棒！🌟</p>
           )}
        </div>

        {/* Input */}
        <NumberPad 
          onNumberClick={handleInput} 
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          disabled={feedback === 'correct'}
        />

      </div>
    </div>
  );
};

export default App;