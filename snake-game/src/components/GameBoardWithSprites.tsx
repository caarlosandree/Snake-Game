import React from 'react';
import { Stage, Layer, Rect, Circle, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import type { Position, Snake } from '@/types/game';
import './GameBoardKonva.css';

interface GameBoardWithSpritesProps {
  snake: Snake;
  food: Position;
  boardWidth: number;
  boardHeight: number;
  cellSize: number;
}

const GameBoardWithSprites: React.FC<GameBoardWithSpritesProps> = ({ 
  snake, 
  food, 
  boardWidth, 
  boardHeight, 
  cellSize 
}) => {
  const canvasWidth = boardWidth * cellSize;
  const canvasHeight = boardHeight * cellSize;
  
  // Carregar imagens (usando URLs de exemplo - você pode substituir por suas próprias imagens)
  const [snakeHeadImage] = useImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzRhZGU4MCIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIzIiBmaWxsPSIjMWYyOTM3Ii8+CjxjaXJjbGUgY3g9IjIyIiBjeT0iMTAiIHI9IjMiIGZpbGw9IiMxZjI5MzciLz4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMS41IiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjIyIiBjeT0iMTAiIHI9IjEuNSIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4K');
  
  const [snakeBodyImage] = useImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMyIgZmlsbD0iIzIyYzU1ZSIvPgo8cmVjdCB4PSI2IiB5PSI2IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHJ4PSIyIiBmaWxsPSIjMTZhMzRhIi8+Cjwvc3ZnPgo=');
  
  const [foodImage] = useImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNlZjQ0NDQiLz4KPGNpcmNsZSBjeD0iOCIgeT0iOCIgcj0iNCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpIi8+Cjwvc3ZnPgo=');

  const renderSnake = () => {
    return snake.body.map((segment, index) => {
      const isHead = index === 0;
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      
      if (isHead && snakeHeadImage) {
        return (
          <KonvaImage
            key={`snake-${index}`}
            image={snakeHeadImage}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
          />
        );
      } else if (!isHead && snakeBodyImage) {
        return (
          <KonvaImage
            key={`snake-${index}`}
            image={snakeBodyImage}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
          />
        );
      } else {
        // Fallback para formas geométricas se as imagens não carregarem
        return (
          <Rect
            key={`snake-${index}`}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            fill={isHead ? '#4ade80' : '#22c55e'}
            stroke={isHead ? '#16a34a' : '#15803d'}
            strokeWidth={2}
            cornerRadius={isHead ? 4 : 2}
          />
        );
      }
    });
  };

  const renderFood = () => {
    const x = food.x * cellSize + cellSize / 2 - cellSize * 0.3;
    const y = food.y * cellSize + cellSize / 2 - cellSize * 0.3;
    
    if (foodImage) {
      return (
        <KonvaImage
          image={foodImage}
          x={x}
          y={y}
          width={cellSize * 0.6}
          height={cellSize * 0.6}
        />
      );
    } else {
      // Fallback para círculo se a imagem não carregar
      const centerX = food.x * cellSize + cellSize / 2;
      const centerY = food.y * cellSize + cellSize / 2;
      const radius = cellSize * 0.3;
      
      return (
        <Circle
          x={centerX}
          y={centerY}
          radius={radius}
          fill="#ef4444"
          stroke="#dc2626"
          strokeWidth={2}
        />
      );
    }
  };

  const renderGrid = () => {
    const gridLines = [];
    
    // Linhas verticais
    for (let i = 1; i < boardWidth; i++) {
      gridLines.push(
        <Rect
          key={`v-line-${i}`}
          x={i * cellSize}
          y={0}
          width={0.5}
          height={canvasHeight}
          fill="rgba(255, 255, 255, 0.1)"
        />
      );
    }
    
    // Linhas horizontais
    for (let i = 1; i < boardHeight; i++) {
      gridLines.push(
        <Rect
          key={`h-line-${i}`}
          x={0}
          y={i * cellSize}
          width={canvasWidth}
          height={0.5}
          fill="rgba(255, 255, 255, 0.1)"
        />
      );
    }
    
    return gridLines;
  };

  return (
    <div className="game-board-container">
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          {/* Fundo do tabuleiro */}
          <Rect
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            fill="#1f2937"
          />
          
          {/* Grid */}
          {renderGrid()}
          
          {/* Cobra com sprites */}
          {renderSnake()}
          
          {/* Comida com sprite */}
          {renderFood()}
        </Layer>
      </Stage>
    </div>
  );
};

export default GameBoardWithSprites;
