import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const colorClasses = {
  green: 'bg-green-400 hover:bg-green-500 text-white border-green-600',
  blue: 'bg-blue-400 hover:bg-blue-500 text-white border-blue-600',
  yellow: 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600',
  red: 'bg-red-400 hover:bg-red-500 text-white border-red-600',
  purple: 'bg-purple-400 hover:bg-purple-500 text-white border-purple-600',
};

const sizeClasses = {
  sm: 'text-lg px-4 py-2',
  md: 'text-2xl px-8 py-4',
  lg: 'text-3xl px-10 py-6',
};

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  color = 'blue', 
  size = 'md', 
  className = '',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${colorClasses[color]} 
        ${sizeClasses[size]} 
        ${className}
        font-bold rounded-3xl border-b-8 active:border-b-0 active:translate-y-2
        transition-all duration-100 shadow-xl
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:border-b-8 disabled:active:translate-y-0
      `}
    >
      {children}
    </button>
  );
};