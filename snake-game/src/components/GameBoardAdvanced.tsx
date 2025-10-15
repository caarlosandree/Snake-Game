import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle, Group } from 'react-konva';
import type { Position, Snake } from '@/types/game';
import './GameBoardKonva.css';

interface GameBoardAdvancedProps {
  snake: Snake;
  food: Position;
  boardWidth: number;
  boardHeight: number;
  cellSize: number;
}

const GameBoardAdvanced: React.FC<GameBoardAdvancedProps> = ({ 
  snake, 
  food, 
  boardWidth, 
  boardHeight, 
  cellSize 
}) => {
  const canvasWidth = boardWidth * cellSize;
  const canvasHeight = boardHeight * cellSize;
  const [foodPulse, setFoodPulse] = useState(1);

  // Animação da comida pulsante
  useEffect(() => {
    const interval = setInterval(() => {
      setFoodPulse(prev => prev === 1 ? 1.2 : 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const renderSnake = () => {
    return snake.body.map((segment, index) => {
      const isHead = index === 0;
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      
      if (isHead) {
        // Cabeça da cobra com olhos
        return (
          <Group key={`snake-${index}`} x={x} y={y}>
            {/* Corpo da cabeça */}
            <Rect
              width={cellSize}
              height={cellSize}
              fill="#4ade80"
              stroke="#16a34a"
              strokeWidth={2}
              cornerRadius={6}
            />
            {/* Olhos */}
            <Circle
              x={cellSize * 0.3}
              y={cellSize * 0.3}
              radius={cellSize * 0.1}
              fill="#1f2937"
            />
            <Circle
              x={cellSize * 0.7}
              y={cellSize * 0.3}
              radius={cellSize * 0.1}
              fill="#1f2937"
            />
            {/* Reflexo nos olhos */}
            <Circle
              x={cellSize * 0.3}
              y={cellSize * 0.3}
              radius={cellSize * 0.05}
              fill="#ffffff"
            />
            <Circle
              x={cellSize * 0.7}
              y={cellSize * 0.3}
              radius={cellSize * 0.05}
              fill="#ffffff"
            />
          </Group>
        );
      } else {
        // Corpo da cobra com padrão
        return (
          <Group key={`snake-${index}`} x={x} y={y}>
            <Rect
              width={cellSize}
              height={cellSize}
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth={2}
              cornerRadius={3}
            />
            {/* Padrão no corpo */}
            <Rect
              x={cellSize * 0.2}
              y={cellSize * 0.2}
              width={cellSize * 0.6}
              height={cellSize * 0.6}
              fill="#16a34a"
              cornerRadius={2}
            />
          </Group>
        );
      }
    });
  };

  const renderFood = () => {
    const x = food.x * cellSize + cellSize / 2;
    const y = food.y * cellSize + cellSize / 2;
    const radius = cellSize * 0.3 * foodPulse;

    return (
      <Group>
        {/* Sombra da comida */}
        <Circle
          x={x + 2}
          y={y + 2}
          radius={radius}
          fill="rgba(0, 0, 0, 0.3)"
        />
        {/* Comida principal */}
        <Circle
          x={x}
          y={y}
          radius={radius}
          fill="#ef4444"
          stroke="#dc2626"
          strokeWidth={2}
        />
        {/* Brilho na comida */}
        <Circle
          x={x - radius * 0.3}
          y={y - radius * 0.3}
          radius={radius * 0.3}
          fill="rgba(255, 255, 255, 0.6)"
        />
      </Group>
    );
  };

  const renderGrid = () => {
    const gridLines = [];
    
    // Linhas verticais mais sutis
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
    
    // Linhas horizontais mais sutis
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
          {/* Fundo gradiente simulado */}
          <Rect
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            fill="#1f2937"
          />
          
          {/* Grid sutil */}
          {renderGrid()}
          
          {/* Cobra */}
          {renderSnake()}
          
          {/* Comida animada */}
          {renderFood()}
        </Layer>
      </Stage>
    </div>
  );
};

export default GameBoardAdvanced;
