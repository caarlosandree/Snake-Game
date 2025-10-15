import React, { useEffect, useRef } from 'react';
import type { Position, Snake } from '../types/game';
import './GameBoard.css';

interface GameBoardProps {
  snake: Snake;
  food: Position;
  boardWidth: number;
  boardHeight: number;
  cellSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  snake, 
  food, 
  boardWidth, 
  boardHeight, 
  cellSize 
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.style.setProperty('--cell-size', `${cellSize}px`);
    }
  }, [cellSize]);

  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake.body[0] && snake.body[0].x === x && snake.body[0].y === y;
    const isSnakeBody = snake.body.some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;

    let cellClass = 'cell';
    if (isSnakeHead) {
      cellClass += ' snake-head';
    } else if (isSnakeBody) {
      cellClass += ' snake-body';
    } else if (isFood) {
      cellClass += ' food';
    }

    return (
      <div
        key={`${x}-${y}`}
        className={cellClass}
        data-x={x}
        data-y={y}
      />
    );
  };

  const cells = [];
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      cells.push(renderCell(x, y));
    }
  }

  return (
    <div 
      ref={boardRef}
      className="game-board"
      data-width={boardWidth * cellSize}
      data-height={boardHeight * cellSize}
    >
      {cells}
    </div>
  );
};

export default GameBoard;
