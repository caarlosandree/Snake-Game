export interface GameConfig {
  boardWidth: number;
  boardHeight: number;
  cellSize: number;
  initialSpeed: number;
  speedIncrement: number;
  foodTimeout: number; // Tempo em segundos que a comida fica disponível
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

export interface Food {
  position: Position;
  expiresAt: number; // Timestamp quando a comida expira
  isActive: boolean;
}

export interface GameState {
  snake: Snake;
  food: Food;
  score: number;
  gameOver: boolean;
  gameStarted: boolean;
  gamePaused: boolean;
  gameTime: number; // Tempo em segundos desde o início
}