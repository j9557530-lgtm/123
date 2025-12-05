export enum Difficulty {
  SIMPLE = 'SIMPLE', // 10以内加减
  MEDIUM = 'MEDIUM', // 20以内加减
  HARD = 'HARD'      // 20以内3个数加减
}

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  REWARD = 'REWARD'
}

export interface MathProblem {
  expression: string; // e.g., "5 + 3"
  answer: number;
  parts: number[];
  operators: string[];
}

export interface Achievement {
  stars: number;
  message: string;
}