import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState, GameConfig, Position, Food } from '@/types/game';
import { Direction } from '@/types/game';

const DEFAULT_CONFIG: GameConfig = {
  boardWidth: 20,
  boardHeight: 20,
  cellSize: 20,
  initialSpeed: 150, // Velocidade inicial 25% mais rápida (150ms)
  speedIncrement: 15, // Incremento de velocidade maior
  foodTimeout: 12, // 12 segundos
};

export const useClassicGame = (config: GameConfig = DEFAULT_CONFIG) => {
  const gameLoopRef = useRef<number | undefined>(undefined);
  const gameStartTimeRef = useRef<number | undefined>(undefined);
  const lastUpdateRef = useRef<number>(0);

  // Gerar posição aleatória para a comida
  const generateRandomPosition = useCallback((): Position => {
    const x = Math.floor(Math.random() * config.boardWidth);
    const y = Math.floor(Math.random() * config.boardHeight);
    return { x, y };
  }, [config.boardWidth, config.boardHeight]);

  // Verificar se a posição está ocupada pela cobra
  const isPositionOccupied = useCallback((position: Position, snakeBody: Position[]): boolean => {
    return snakeBody.some(segment => segment.x === position.x && segment.y === position.y);
  }, []);

  // Calcular velocidade dinâmica baseada na pontuação
  const calculateCurrentSpeed = useCallback((score: number): number => {
    const speedLevels = Math.floor(score / 5); // A cada 5 pontos aumenta a velocidade
    const speedReduction = speedLevels * config.speedIncrement;
    const newSpeed = Math.max(config.initialSpeed - speedReduction, 50); // Velocidade mínima de 50ms
    return newSpeed;
  }, [config.initialSpeed, config.speedIncrement]);

  // Calcular distância máxima alcançável em 12 segundos
  const calculateMaxReachableDistance = useCallback((currentSpeed: number): number => {
    const timeLimit = 12; // 12 segundos
    const movesPerSecond = 1000 / currentSpeed; // Movimentos por segundo
    const maxMoves = Math.floor(movesPerSecond * timeLimit); // Movimentos em 12 segundos
    return maxMoves; // Distância em células
  }, []);

  // Verificar se uma posição está dentro da distância alcançável
  const isPositionReachable = useCallback((position: Position, snakeHead: Position, maxDistance: number): boolean => {
    const distance = Math.abs(position.x - snakeHead.x) + Math.abs(position.y - snakeHead.y); // Distância Manhattan
    return distance <= maxDistance;
  }, []);

  // Encontrar a posição válida mais próxima da cabeça
  const findNearestValidPosition = useCallback((snakeHead: Position, snakeBody: Position[], maxDistance: number): Position => {
    // Procurar em espiral a partir da cabeça
    for (let radius = 1; radius <= maxDistance; radius++) {
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          // Verificar se está na borda do quadrado de raio 'radius'
          if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
            const x = snakeHead.x + dx;
            const y = snakeHead.y + dy;
            
            // Verificar se está dentro do tabuleiro
            if (x >= 0 && x < config.boardWidth && y >= 0 && y < config.boardHeight) {
              const position = { x, y };
              
              // Verificar se não está ocupada pela cobra
              if (!isPositionOccupied(position, snakeBody)) {
                return position;
              }
            }
          }
        }
      }
    }
    
    // Fallback: retornar posição aleatória válida
    let position: Position;
    do {
      position = generateRandomPosition();
    } while (isPositionOccupied(position, snakeBody));
    
    return position;
  }, [config.boardWidth, config.boardHeight, isPositionOccupied, generateRandomPosition]);

  // Estado inicial do jogo
  const [gameState, setGameState] = useState<GameState>(() => {
    const centerX = Math.floor(config.boardWidth / 2);
    const centerY = Math.floor(config.boardHeight / 2);
    const initialSnakeBody = [{ x: centerX, y: centerY }];
    
    // Gerar comida inicial de forma simples (sem usar generateNewFood ainda)
    const initialFood: Food = {
      position: { x: Math.floor(config.boardWidth / 4), y: Math.floor(config.boardHeight / 4) },
      expiresAt: Date.now() + config.foodTimeout * 1000,
      isActive: true,
    };
    
    return {
      snake: {
        body: initialSnakeBody,
        direction: Direction.RIGHT,
      },
      food: initialFood,
      score: 0,
      gameOver: false,
      gameStarted: false,
      gamePaused: false,
      gameTime: 0,
    };
  });

  // Gerar nova comida em posição válida e alcançável
  const generateNewFood = useCallback((snakeBody: Position[], currentSpeed: number): Food => {
    const snakeHead = snakeBody[0];
    const maxDistance = calculateMaxReachableDistance(currentSpeed);
    
    let newPosition: Position;
    let attempts = 0;
    const maxAttempts = 100; // Limite de tentativas para evitar loop infinito
    
    do {
      newPosition = generateRandomPosition();
      attempts++;
      
      // Se exceder o limite de tentativas, usar posição mais próxima
      if (attempts >= maxAttempts) {
        // Encontrar a posição válida mais próxima da cabeça
        newPosition = findNearestValidPosition(snakeHead, snakeBody, maxDistance);
        break;
      }
    } while (isPositionOccupied(newPosition, snakeBody) || 
             !isPositionReachable(newPosition, snakeHead, maxDistance));

    return {
      position: newPosition,
      expiresAt: Date.now() + config.foodTimeout * 1000,
      isActive: true,
    };
  }, [generateRandomPosition, isPositionOccupied, isPositionReachable, calculateMaxReachableDistance, config.foodTimeout, findNearestValidPosition]);

  // Verificar colisões
  const checkCollisions = useCallback((snake: { body: Position[] }): boolean => {
    const head = snake.body[0];
    
    // Colisão com paredes
    if (head.x < 0 || head.x >= config.boardWidth || head.y < 0 || head.y >= config.boardHeight) {
      return true;
    }
    
    // Colisão com o próprio corpo
    return snake.body.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  }, [config.boardWidth, config.boardHeight]);

  // Mover a cobra
  const moveSnake = useCallback((snake: { body: Position[]; direction: Direction }) => {
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

    newBody.unshift(head);
    return newBody;
  }, []);

  // Loop principal do jogo
  const gameLoop = useCallback((timestamp: number) => {
    // Só definir o tempo de início quando o jogo realmente começar
    if (!gameStartTimeRef.current && gameState.gameStarted) {
      gameStartTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastUpdateRef.current;
    const gameTime = Math.floor((timestamp - (gameStartTimeRef.current || 0)) / 1000);

    // Calcular velocidade atual baseada na pontuação
    const currentSpeed = calculateCurrentSpeed(gameState.score);

    // Atualizar baseado na velocidade dinâmica
    if (deltaTime >= currentSpeed) {
      setGameState(prevState => {
        if (prevState.gameOver || !prevState.gameStarted || prevState.gamePaused) {
          return prevState;
        }

        // Verificar se a comida expirou
        const currentTime = Date.now();
        let newFood = prevState.food;
        let newScore = prevState.score;
        let newSnakeBody = prevState.snake.body;

        if (currentTime >= prevState.food.expiresAt && prevState.food.isActive) {
          // Comida expirou - cobra cresce e perde ponto
          newFood = generateNewFood(prevState.snake.body, currentSpeed);
          newScore = Math.max(0, prevState.score - 1);
          newSnakeBody = [...prevState.snake.body, prevState.snake.body[prevState.snake.body.length - 1]];
        }

        // Mover a cobra
        const updatedSnake = {
          ...prevState.snake,
          body: moveSnake({ body: newSnakeBody, direction: prevState.snake.direction })
        };

        // Verificar se comeu a comida
        if (updatedSnake.body[0].x === newFood.position.x && 
            updatedSnake.body[0].y === newFood.position.y && 
            newFood.isActive) {
          // Comeu a comida - ganha ponto e cresce
          newScore += 1;
          newFood = generateNewFood(updatedSnake.body, currentSpeed);
        } else {
          // Remove a cauda se não comeu
          updatedSnake.body.pop();
        }

        // Verificar colisões
        const gameOver = checkCollisions(updatedSnake);

        return {
          ...prevState,
          snake: updatedSnake,
          food: newFood,
          score: newScore,
          gameOver,
          gameTime,
        };
      });

      lastUpdateRef.current = timestamp;
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.score, gameState.gameStarted, moveSnake, generateNewFood, checkCollisions, calculateCurrentSpeed]);

  // Iniciar o jogo
  const startGame = useCallback(() => {
    if (!gameState.gameStarted) {
      setGameState(prev => ({
        ...prev,
        gameStarted: true,
        gamePaused: false,
        gameOver: false,
        gameTime: 0,
      }));
      gameStartTimeRef.current = undefined;
      lastUpdateRef.current = 0;
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState.gameStarted, gameLoop]);

  // Pausar o jogo
  const pauseGame = useCallback(() => {
    if (gameState.gameStarted && !gameState.gameOver) {
      setGameState(prev => ({
        ...prev,
        gamePaused: !prev.gamePaused,
      }));
    }
  }, [gameState.gameStarted, gameState.gameOver]);

  // Reiniciar o jogo
  const resetGame = useCallback(() => {
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    
    const centerX = Math.floor(config.boardWidth / 2);
    const centerY = Math.floor(config.boardHeight / 2);
    
    const initialSnakeBody = [{ x: centerX, y: centerY }];
    setGameState({
      snake: {
        body: initialSnakeBody,
        direction: Direction.RIGHT,
      },
      food: generateNewFood(initialSnakeBody, config.initialSpeed),
      score: 0,
      gameOver: false,
      gameStarted: false,
      gamePaused: false,
      gameTime: 0,
    });
    
    gameStartTimeRef.current = undefined;
    lastUpdateRef.current = 0;
  }, [generateNewFood, config.boardWidth, config.boardHeight, config.initialSpeed]);

  // Mudar direção
  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prev => {
      if (!prev.gameStarted || prev.gamePaused || prev.gameOver) {
        return prev;
      }

      // Prevenir movimento na direção oposta
      const oppositeDirections = {
        [Direction.UP]: Direction.DOWN,
        [Direction.DOWN]: Direction.UP,
        [Direction.LEFT]: Direction.RIGHT,
        [Direction.RIGHT]: Direction.LEFT,
      };

      if (oppositeDirections[newDirection] === prev.snake.direction) {
        return prev;
      }

      return {
        ...prev,
        snake: {
          ...prev.snake,
          direction: newDirection,
        },
      };
    });
  }, []);

  // Controles de teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
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
        case 'r':
        case 'R':
          event.preventDefault();
          resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [changeDirection, pauseGame, resetGame]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  return {
    gameState,
    config,
    startGame,
    pauseGame,
    resetGame,
    changeDirection,
  };
};
