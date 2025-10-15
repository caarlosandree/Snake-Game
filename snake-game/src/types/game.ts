export interface GameConfig {
  boardWidth: number;
  boardHeight: number;
  cellSize: number;
  initialSpeed: number;
  speedIncrement: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Snake {
  body: Position[];
  direction: Direction;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export interface GameState {
  snake: Snake;
  food: Position;
  score: number;
  gameOver: boolean;
  gameStarted: boolean;
  gamePaused: boolean;
}