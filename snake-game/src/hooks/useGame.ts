import { useState, useEffect, useCallback, useRef } from 'react';
import { Direction } from '@/types/game';
import type { GameState, Position, Snake, GameConfig } from '@/types/game';

const GAME_CONFIG: GameConfig = {
  boardWidth: 20,
  boardHeight: 20,
  cellSize: 20,
  initialSpeed: 150,
  speedIncrement: 5
};

const createInitialSnake = (): Snake => ({
  body: [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ],
  direction: Direction.RIGHT
});

const generateFood = (snakeBody: Position[], boardWidth: number, boardHeight: number): Position => {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * boardWidth),
      y: Math.floor(Math.random() * boardHeight)
    };
  } while (snakeBody.some(segment => segment.x === food.x && segment.y === food.y));
  
  return food;
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: createInitialSnake(),
    food: { x: 15, y: 15 },
    score: 0,
    gameOver: false,
    gameStarted: false,
    gamePaused: false
  });

  const gameLoopRef = useRef<number | undefined>(undefined);
  const speedRef = useRef(GAME_CONFIG.initialSpeed);

  const resetGame = useCallback(() => {
    setGameState({
      snake: createInitialSnake(),
      food: generateFood(createInitialSnake().body, GAME_CONFIG.boardWidth, GAME_CONFIG.boardHeight),
      score: 0,
      gameOver: false,
      gameStarted: false,
      gamePaused: false
    });
    speedRef.current = GAME_CONFIG.initialSpeed;
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStarted: true, gamePaused: false }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gamePaused: !prev.gamePaused }));
  }, []);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prev => {
      const { snake } = prev;
      const oppositeDirections = {
        [Direction.UP]: Direction.DOWN,
        [Direction.DOWN]: Direction.UP,
        [Direction.LEFT]: Direction.RIGHT,
        [Direction.RIGHT]: Direction.LEFT
      };

      if (oppositeDirections[newDirection] === snake.direction) {
        return prev;
      }

      return {
        ...prev,
        snake: { ...snake, direction: newDirection }
      };
    });
  }, []);

  const moveSnake = useCallback(() => {
    setGameState(prev => {
      if (!prev.gameStarted || prev.gamePaused || prev.gameOver) {
        return prev;
      }

      const { snake, food, score } = prev;
      const newBody = [...snake.body];
      const head = { ...newBody[0] };

      switch (snake.direction) {
        case Direction.UP:
          head.y -= 1;
          break;
        case Direction.DOWN:
          head.y += 1;
          break;
        case Direction.LEFT:
          head.x -= 1;
          break;
        case Direction.RIGHT:
          head.x += 1;
          break;
      }

      // Verificar colisões com as bordas
      if (
        head.x < 0 || 
        head.x >= GAME_CONFIG.boardWidth || 
        head.y < 0 || 
        head.y >= GAME_CONFIG.boardHeight
      ) {
        return { ...prev, gameOver: true };
      }

      // Verificar colisão com o próprio corpo
      if (newBody.some(segment => segment.x === head.x && segment.y === head.y)) {
        return { ...prev, gameOver: true };
      }

      newBody.unshift(head);

      // Verificar se comeu a comida
      if (head.x === food.x && head.y === food.y) {
        const newScore = score + 10;
        const newFood = generateFood(newBody, GAME_CONFIG.boardWidth, GAME_CONFIG.boardHeight);
        
        // Aumentar velocidade gradualmente
        speedRef.current = Math.max(50, speedRef.current - GAME_CONFIG.speedIncrement);
        
        return {
          ...prev,
          snake: { ...snake, body: newBody },
          food: newFood,
          score: newScore
        };
      } else {
        newBody.pop();
      }

      return {
        ...prev,
        snake: { ...snake, body: newBody }
      };
    });
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gamePaused && !gameState.gameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, speedRef.current);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.gamePaused, gameState.gameOver, moveSnake]);

  // Controles de teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameState.gameStarted || gameState.gameOver) return;

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault();
          changeDirection(Direction.UP);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault();
          changeDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault();
          changeDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault();
          changeDirection(Direction.RIGHT);
          break;
        case ' ':
          event.preventDefault();
          pauseGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameStarted, gameState.gameOver, changeDirection, pauseGame]);

  return {
    gameState,
    config: GAME_CONFIG,
    resetGame,
    startGame,
    pauseGame,
    changeDirection
  };
};
