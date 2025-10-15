# 🎮 Guia de Bibliotecas Gráficas para Jogos em React

Este projeto demonstra diferentes abordagens para implementar gráficos em jogos React, especificamente para o jogo da cobrinha.

## 📚 Bibliotecas Disponíveis

### 1. **CSS Puro** (GameBoard.tsx)
- **Vantagens**: Simples, leve, sem dependências
- **Desvantagens**: Limitado para animações complexas
- **Uso**: Jogos simples com poucos elementos visuais

### 2. **React-Konva** (GameBoardKonva.tsx)
- **Vantagens**: Performance excelente, fácil de usar, boa documentação
- **Desvantagens**: Limitado a gráficos 2D
- **Uso**: Jogos 2D com boa performance

### 3. **React-Konva Avançado** (GameBoardAdvanced.tsx)
- **Vantagens**: Animações, efeitos visuais, gráficos mais elaborados
- **Desvantagens**: Mais complexo de implementar
- **Uso**: Jogos que precisam de efeitos visuais

### 4. **Sprites/Imagens** (GameBoardWithSprites.tsx)
- **Vantagens**: Gráficos personalizados, mais realista
- **Desvantagens**: Precisa de assets gráficos
- **Uso**: Jogos com arte customizada

## 🚀 Como Usar

### Instalação das Dependências

```bash
# Para React-Konva
npm install konva react-konva

# Para carregar imagens
npm install use-image
```

### Exemplo de Uso Básico

```tsx
import { Stage, Layer, Rect, Circle } from 'react-konva';

const GameBoard = () => (
  <Stage width={400} height={400}>
    <Layer>
      <Rect x={0} y={0} width={400} height={400} fill="#1f2937" />
      <Circle x={200} y={200} radius={20} fill="#ef4444" />
    </Layer>
  </Stage>
);
```

### Exemplo com Animações

```tsx
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const AnimatedGame = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.2 : 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stage width={400} height={400}>
      <Layer>
        <Rect 
          x={180} y={180} 
          width={40} height={40} 
          fill="#ef4444"
          scaleX={scale}
          scaleY={scale}
        />
      </Layer>
    </Stage>
  );
};
```

### Exemplo com Imagens/Sprites

```tsx
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const GameWithSprites = () => {
  const [image] = useImage('/path/to/sprite.png');
  
  return (
    <Stage width={400} height={400}>
      <Layer>
        {image && (
          <KonvaImage 
            image={image} 
            x={0} y={0} 
            width={32} height={32} 
          />
        )}
      </Layer>
    </Stage>
  );
};
```

## 🎨 Outras Bibliotecas Recomendadas

### Para Jogos 2D:
- **Phaser.js**: Framework completo para jogos
- **Pixi.js**: Renderização 2D de alta performance
- **Easel.js**: Biblioteca canvas simplificada

### Para Jogos 3D:
- **React Three Fiber**: Integração do Three.js com React
- **Babylon.js**: Engine 3D completa

### Para Física:
- **Matter.js**: Engine de física 2D
- **Cannon.js**: Engine de física 3D

## 📁 Estrutura dos Arquivos

```
src/components/
├── GameBoard.tsx              # CSS puro
├── GameBoardKonva.tsx         # React-Konva básico
├── GameBoardAdvanced.tsx      # React-Konva com animações
├── GameBoardWithSprites.tsx   # React-Konva com imagens
└── SnakeGameWithGraphics.tsx  # Seletor de modos gráficos
```

## 🔧 Configuração

1. Instale as dependências necessárias
2. Importe o componente desejado
3. Configure as props (snake, food, boardWidth, etc.)
4. Estilize conforme necessário

## 💡 Dicas

- Use React-Konva para jogos que precisam de performance
- Implemente animações com `useEffect` e `useState`
- Para sprites, use SVG inline ou URLs de imagens
- Sempre tenha fallbacks para quando imagens não carregam
- Teste em diferentes dispositivos para garantir performance
