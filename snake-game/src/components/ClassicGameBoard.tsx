import React, { useEffect, useRef } from 'react';
import type { GameState, GameConfig } from '@/types/game';
import './ClassicGameBoard.css';

interface ClassicGameBoardProps {
  gameState: GameState;
  config: GameConfig;
}

const ClassicGameBoard: React.FC<ClassicGameBoardProps> = ({ gameState, config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calcular o cellSize real baseado no canvas atual
    const actualCellSize = canvas.width / config.boardWidth;

    const draw = () => {
      // Limpar canvas
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Desenhar grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x <= config.boardWidth; x++) {
        ctx.beginPath();
        ctx.moveTo(x * actualCellSize, 0);
        ctx.lineTo(x * actualCellSize, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y <= config.boardHeight; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * actualCellSize);
        ctx.lineTo(canvas.width, y * actualCellSize);
        ctx.stroke();
      }

      // Desenhar cobra
      gameState.snake.body.forEach((segment, index) => {
        const x = segment.x * actualCellSize;
        const y = segment.y * actualCellSize;
        
        if (index === 0) {
          // Cabeça da cobra
          const gradient = ctx.createLinearGradient(x, y, x + actualCellSize, y + actualCellSize);
          gradient.addColorStop(0, '#4ade80');
          gradient.addColorStop(1, '#22c55e');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x + 1, y + 1, actualCellSize - 2, actualCellSize - 2);
          
          // Olhos da cobra
          ctx.fillStyle = '#1f2937';
          const eyeSize = actualCellSize * 0.15;
          const eyeOffset = actualCellSize * 0.25;
          
          ctx.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize);
          ctx.fillRect(x + actualCellSize - eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize);
          
          // Reflexo nos olhos
          ctx.fillStyle = '#ffffff';
          const reflectionSize = eyeSize * 0.5;
          ctx.fillRect(x + eyeOffset + 1, y + eyeOffset + 1, reflectionSize, reflectionSize);
          ctx.fillRect(x + actualCellSize - eyeOffset - reflectionSize - 1, y + eyeOffset + 1, reflectionSize, reflectionSize);
        } else {
          // Corpo da cobra
          const gradient = ctx.createLinearGradient(x, y, x + actualCellSize, y + actualCellSize);
          gradient.addColorStop(0, '#22c55e');
          gradient.addColorStop(1, '#16a34a');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x + 1, y + 1, actualCellSize - 2, actualCellSize - 2);
          
          // Padrão no corpo
          ctx.fillStyle = '#15803d';
          ctx.fillRect(x + actualCellSize * 0.2, y + actualCellSize * 0.2, 
                      actualCellSize * 0.6, actualCellSize * 0.6);
        }
      });

      // Desenhar comida
      if (gameState.food.isActive) {
        const foodX = gameState.food.position.x * actualCellSize;
        const foodY = gameState.food.position.y * actualCellSize;
        const centerX = foodX + actualCellSize / 2;
        const centerY = foodY + actualCellSize / 2;
        const radius = actualCellSize * 0.4;
        
        // Sombra da comida
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(centerX + 2, centerY + 2, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Comida principal
        const foodGradient = ctx.createRadialGradient(centerX - radius * 0.3, centerY - radius * 0.3, 0, centerX, centerY, radius);
        foodGradient.addColorStop(0, '#ef4444');
        foodGradient.addColorStop(1, '#dc2626');
        
        ctx.fillStyle = foodGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Brilho na comida
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Indicador de tempo (se estiver próximo do vencimento)
        const timeLeft = Math.max(0, gameState.food.expiresAt - Date.now()) / 1000;
        if (timeLeft <= 5) {
          const pulseSize = actualCellSize * (1 + Math.sin(Date.now() * 0.01) * 0.1);
          const pulseAlpha = 0.3 + Math.sin(Date.now() * 0.02) * 0.2;
          
          ctx.strokeStyle = `rgba(239, 68, 68, ${pulseAlpha})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(centerX, centerY, pulseSize / 2, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }

      // Desenhar efeitos de jogo
      if (gameState.gameOver) {
        // Overlay escuro
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    draw();
    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, config]);

  // Ajustar tamanho do canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const navbarHeight = 100; // Altura real da navbar
      const availableHeight = window.innerHeight - navbarHeight;
      const availableWidth = window.innerWidth;
      
      // Calcular tamanho baseado na proporção do jogo
      const gameAspectRatio = config.boardWidth / config.boardHeight;
      const screenAspectRatio = availableWidth / availableHeight;
      
      let canvasWidth, canvasHeight;
      
      if (screenAspectRatio > gameAspectRatio) {
        // Tela mais larga que o jogo - usar toda a altura disponível
        canvasHeight = availableHeight * 0.98; // 98% da altura para usar quase toda a tela
        canvasWidth = canvasHeight * gameAspectRatio;
      } else {
        // Tela mais alta que o jogo - usar toda a largura disponível
        canvasWidth = availableWidth * 0.98; // 98% da largura para usar quase toda a tela
        canvasHeight = canvasWidth / gameAspectRatio;
      }
      
      // Ajustar para múltiplos do cellSize
      const cellWidth = Math.floor(canvasWidth / config.boardWidth);
      const cellHeight = Math.floor(canvasHeight / config.boardHeight);
      const cellSize = Math.min(cellWidth, cellHeight);
      
      // Garantir que o cellSize seja pelo menos 1
      const finalCellSize = Math.max(1, cellSize);
      
      canvas.width = finalCellSize * config.boardWidth;
      canvas.height = finalCellSize * config.boardHeight;
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [config]);

  return (
    <div className="classic-game-board">
      <canvas 
        ref={canvasRef}
        className="game-canvas"
      />
    </div>
  );
};

export default ClassicGameBoard;
