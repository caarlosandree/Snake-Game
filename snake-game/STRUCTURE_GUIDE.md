# 🎮 Guia da Estrutura do Jogo da Cobrinha

Este documento descreve a estrutura completa do jogo da cobrinha com sistema de páginas, navegação e recordes.

## 📁 Estrutura de Arquivos

```
src/
├── components/           # Componentes reutilizáveis
│   ├── GameBoard.tsx            # Tabuleiro CSS básico
│   ├── GameBoardKonva.tsx       # Tabuleiro com React-Konva
│   ├── GameBoardAdvanced.tsx    # Tabuleiro com animações
│   ├── GameBoardWithSprites.tsx # Tabuleiro com sprites
│   ├── GameControls.tsx         # Controles do jogo
│   ├── GameInfo.tsx             # Informações do jogo
│   ├── SnakeGame.tsx            # Jogo principal
│   ├── SnakeGameWithGraphics.tsx # Jogo com seletor gráfico
│   └── PlayerNameModal.tsx      # Modal para nome do jogador
├── pages/                # Páginas da aplicação
│   ├── MainMenu.tsx             # Menu principal
│   ├── GamePage.tsx             # Página do jogo
│   ├── RecordsPage.tsx          # Página de recordes
│   ├── TutorialPage.tsx         # Tutorial
│   └── AboutPage.tsx            # Sobre o jogo
├── hooks/                # Hooks customizados
│   ├── useGame.ts               # Lógica do jogo
│   └── useRecords.ts            # Sistema de recordes
├── types/                # Definições de tipos
│   ├── game.ts                  # Tipos do jogo
│   └── records.ts               # Tipos dos recordes
└── App.tsx               # Configuração principal
```

## 🚀 Funcionalidades Implementadas

### 1. **Sistema de Navegação**
- React Router para navegação entre páginas
- Rotas configuradas:
  - `/` - Menu principal
  - `/game/:gameMode` - Página do jogo
  - `/records` - Recordes
  - `/tutorial` - Tutorial
  - `/about` - Sobre

### 2. **Menu Principal**
- Interface moderna com gradientes
- Botões para diferentes modos de jogo
- Navegação para tutorial, recordes e sobre
- Modal para inserir nome do jogador

### 3. **Sistema de Recordes**
- Salva automaticamente: nome, pontuação, tempo
- Persistência no localStorage
- Ranking ordenado por pontuação
- Detecção de novos recordes
- Funcionalidade de limpar recordes

### 4. **Modal do Jogador**
- Validação de nome (2-20 caracteres)
- Interface responsiva
- Controles de teclado (Enter, Escape)

### 5. **Páginas de Conteúdo**
- **Tutorial**: Instruções completas do jogo
- **Recordes**: Visualização de todos os recordes
- **Sobre**: Informações técnicas e tecnologias

### 6. **Página do Jogo**
- Integração com sistema de recordes
- Cronômetro automático
- Modal de fim de jogo
- Opção de jogar novamente

## 🎨 Modos Gráficos

### CSS Básico
- Tabuleiro com CSS Grid
- Cores e estilos simples
- Performance máxima

### React-Konva
- Renderização 2D otimizada
- Gráficos vetoriais
- Animações suaves

### Modo Avançado
- Efeitos visuais elaborados
- Animações da comida
- Cobra com olhos e padrões

### Sprites
- Suporte a imagens
- Fallback para formas geométricas
- Assets SVG inline

## 🏆 Sistema de Recordes

### Estrutura do Recorde
```typescript
interface GameRecord {
  id: string;           // ID único
  playerName: string;   // Nome do jogador
  score: number;        // Pontuação final
  timeInSeconds: number; // Tempo em segundos
  date: string;         // Data/hora da partida
  difficulty?: string;   // Modo de jogo
}
```

### Funcionalidades
- **Adicionar**: `addRecord(record)`
- **Listar**: `getTopRecords(limit)`
- **Limpar**: `clearRecords()`
- **Verificar**: `isNewRecord(score)`

## 🎮 Como Usar

### 1. Iniciar o Jogo
1. Acesse o menu principal
2. Clique em um modo de jogo
3. Digite seu nome no modal
4. Jogue normalmente

### 2. Ver Recordes
1. Clique em "🏆 Recordes" no menu
2. Visualize o ranking
3. Use "Ver Todos" para todos os recordes
4. Use "Limpar Recordes" para resetar

### 3. Tutorial
1. Clique em "📖 Tutorial" no menu
2. Leia as instruções
3. Aprenda os controles
4. Veja as dicas

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **React Router** - Navegação
- **React-Konva** - Gráficos 2D
- **Vite** - Build tool
- **CSS3** - Estilos modernos

## 📱 Responsividade

Todas as páginas são totalmente responsivas:
- **Desktop**: Layout completo
- **Tablet**: Adaptação de colunas
- **Mobile**: Layout vertical otimizado

## 🎯 Próximos Passos

### Possíveis Melhorias
1. **Multiplayer online**
2. **Mais modos de jogo**
3. **Sistema de conquistas**
4. **Temas personalizáveis**
5. **Sons e música**
6. **Animações mais elaboradas**

### Integração com Backend
- API para sincronizar recordes
- Sistema de usuários
- Ranking global
- Partidas em tempo real

## 🔧 Configuração

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📝 Notas de Desenvolvimento

- O sistema de recordes usa localStorage por simplicidade
- Todos os componentes são funcionais com hooks
- O código segue padrões modernos do React
- Interface totalmente acessível
- Performance otimizada para dispositivos móveis
