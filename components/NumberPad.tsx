import React from 'react';

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onDelete: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, onDelete, onSubmit, disabled }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm mx-auto mt-6">
      {numbers.map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num)}
          disabled={disabled}
          className="bg-white hover:bg-blue-50 text-blue-600 font-bold text-3xl p-4 rounded-2xl shadow-md border-b-4 border-blue-200 active:border-b-0 active:translate-y-1 transition-all"
        >
          {num}
        </button>
      ))}
      <button
        onClick={onDelete}
        disabled={disabled}
        className="bg-red-100 hover:bg-red-200 text-red-500 font-bold text-xl p-4 rounded-2xl shadow-md border-b-4 border-red-200 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center"
      >
        ❌ 擦掉
      </button>
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="bg-green-400 hover:bg-green-500 text-white font-bold text-xl p-4 rounded-2xl shadow-md border-b-4 border-green-600 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center"
      >
        ✅ 确定
      </button>
    </div>
  );
};