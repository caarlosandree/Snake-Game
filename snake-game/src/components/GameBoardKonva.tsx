import React from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import type { Position, Snake } from '@/types/game';
import './GameBoardKonva.css';

interface GameBoardKonvaProps {
  snake: Snake;
  food: Position;
  boardWidth: number;
  boardHeight: number;
  cellSize: number;
}

const GameBoardKonva: React.FC<GameBoardKonvaProps> = ({ 
  snake, 
  food, 
  boardWidth, 
  boardHeight, 
  cellSize 
}) => {
  const canvasWidth = boardWidth * cellSize;
  const canvasHeight = boardHeight * cellSize;

  const renderSnake = () => {
    return snake.body.map((segment, index) => {
      const isHead = index === 0;
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      
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
    });
  };

  const renderFood = () => {
    const x = food.x * cellSize + cellSize / 2;
    const y = food.y * cellSize + cellSize / 2;
    const radius = cellSize * 0.4;

    return (
      <Circle
        x={x}
        y={y}
        radius={radius}
        fill="#ef4444"
        stroke="#dc2626"
        strokeWidth={2}
      />
    );
  };

  const renderGrid = () => {
    const gridLines = [];
    
    // Linhas verticais
    for (let i = 0; i <= boardWidth; i++) {
      gridLines.push(
        <Rect
          key={`v-line-${i}`}
          x={i * cellSize}
          y={0}
          width={1}
          height={canvasHeight}
          fill="#374151"
        />
      );
    }
    
    // Linhas horizontais
    for (let i = 0; i <= boardHeight; i++) {
      gridLines.push(
        <Rect
          key={`h-line-${i}`}
          x={0}
          y={i * cellSize}
          width={canvasWidth}
          height={1}
          fill="#374151"
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
          
          {/* Cobra */}
          {renderSnake()}
          
          {/* Comida */}
          {renderFood()}
        </Layer>
      </Stage>
    </div>
  );
};

export default GameBoardKonva;
