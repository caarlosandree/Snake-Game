# 🐍 Jogo da Cobrinha Online

Um jogo da cobrinha moderno e interativo desenvolvido em React + TypeScript, com múltiplos modos de jogo, sistema de recordes e interface responsiva.

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Como Jogar](#-como-jogar)
- [Modos de Jogo](#-modos-de-jogo)
- [Sistema de Recordes](#-sistema-de-recordes)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Desenvolvimento](#-desenvolvimento)

## ✨ Características

### 🎮 Funcionalidades Principais
- **Múltiplos Modos de Jogo**: Clássico, Avançado e com Gráficos
- **Sistema de Recordes**: Salva automaticamente os melhores resultados
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile
- **Controles Intuitivos**: Suporte a setas e WASD
- **Tempo de Jogo**: Cronômetro automático durante as partidas
- **Sistema de Comida com Expiração**: Comida que desaparece após 12 segundos
- **Velocidade Dinâmica**: Aumenta conforme a pontuação
- **Efeitos Visuais**: Animações e transições suaves

### 🎨 Recursos Visuais
- **Design Moderno**: Interface com gradientes e sombras
- **Tema Escuro**: Visual elegante e confortável para os olhos
- **Animações CSS**: Transições suaves e efeitos hover
- **Renderização Avançada**: Suporte a Konva.js para gráficos complexos
- **Pixel Perfect**: Renderização crisp para melhor qualidade visual

## 🛠 Tecnologias

### Frontend
- **React 19.1.1** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **React Router DOM** - Roteamento
- **Konva.js + React-Konva** - Renderização de gráficos 2D
- **Vite** - Build tool e dev server

### Estilização
- **CSS3** - Estilos modernos com gradientes e animações
- **CSS Grid & Flexbox** - Layout responsivo
- **CSS Custom Properties** - Variáveis CSS para temas

### Ferramentas de Desenvolvimento
- **ESLint** - Linting e formatação
- **TypeScript ESLint** - Linting específico para TypeScript
- **React Hooks ESLint** - Regras para React Hooks

## 🚀 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd jogo-cobrinha-online/snake-game
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

## 🎮 Como Jogar

### 🎯 Objetivo
Faça a cobrinha crescer o máximo possível coletando a comida vermelha, sem colidir com as paredes ou com o próprio corpo.

### 🕹️ Controles

#### Teclado
- **Setas direcionais** (↑ ↓ ← →) - Mover a cobrinha
- **WASD** - Alternativa às setas
- **Espaço** - Pausar/Despausar o jogo
- **Enter** - Iniciar o jogo ou jogar novamente
- **Escape** - Voltar ao menu ou pausar

#### Interface
- **Botões na tela** - Para controles adicionais
- **Navbar** - Informações do jogo em tempo real

### 📊 Sistema de Pontuação
- **+1 ponto** por comida coletada
- **-1 ponto** quando a comida expira (modo clássico)
- **Velocidade aumenta** a cada 5 pontos
- **Tempo cronometrado** automaticamente

## 🎮 Modos de Jogo

### 🎮 Clássico
- **Tabuleiro**: 50x40 células (pixels menores)
- **Velocidade**: Inicial 250ms, aumenta dinamicamente
- **Comida**: Expira em 12 segundos
- **Mecânica**: Penalidade por comida perdida
- **Estilo**: Visual pixelado retro

### ⚡ Avançado
- **Tabuleiro**: 20x20 células padrão
- **Velocidade**: 150ms inicial, aumenta gradualmente
- **Comida**: Sem expiração
- **Mecânica**: Crescimento contínuo
- **Estilo**: Animações e efeitos visuais

### 🎨 Com Gráficos
- **Renderização**: Konva.js para gráficos 2D
- **Performance**: Otimizado para animações complexas
- **Recursos**: Efeitos visuais avançados
- **Compatibilidade**: Suporte a sprites e texturas

## 🏆 Sistema de Recordes

### 📈 Funcionalidades
- **Armazenamento Local**: Recordes salvos no localStorage
- **Top 10**: Lista dos melhores resultados
- **Detalhes**: Nome do jogador, pontuação, tempo e data
- **Dificuldade**: Registra o modo de jogo utilizado
- **Persistência**: Mantém os dados entre sessões

### 📊 Informações Salvas
```typescript
interface GameRecord {
  id: string;           // ID único do recorde
  playerName: string;   // Nome do jogador
  score: number;        // Pontuação final
  timeInSeconds: number; // Tempo de jogo
  date: string;         // Data da partida
  difficulty?: string;   // Modo de jogo
}
```

### 🎯 Como Salvar
- Complete uma partida com pontuação > 0
- Clique em "Salvar e Voltar" no modal de fim de jogo
- Seu recorde será automaticamente adicionado à lista

## 📁 Estrutura do Projeto

```
snake-game/
├── public/                 # Arquivos públicos
├── src/
│   ├── components/         # Componentes React
│   │   ├── ClassicGameBoard.tsx    # Tabuleiro do modo clássico
│   │   ├── GameBoardKonva.tsx      # Renderização com Konva
│   │   ├── GameBoardWithSprites.tsx # Componentes com sprites
│   │   ├── GameNavbar.tsx          # Barra de navegação do jogo
│   │   ├── PlayerNameModal.tsx     # Modal para nome do jogador
│   │   ├── SnakeGame.tsx           # Componente principal do jogo
│   │   └── SnakeGameWithGraphics.tsx # Jogo com gráficos avançados
│   ├── hooks/              # Custom Hooks
│   │   ├── useClassicGame.ts       # Lógica do jogo clássico
│   │   ├── useGame.ts              # Lógica do jogo padrão
│   │   └── useRecords.ts           # Gerenciamento de recordes
│   ├── pages/              # Páginas da aplicação
│   │   ├── AboutPage.tsx           # Página sobre o jogo
│   │   ├── ClassicGamePage.tsx     # Página do modo clássico
│   │   ├── GamePage.tsx            # Página dos outros modos
│   │   ├── MainMenu.tsx            # Menu principal
│   │   ├── RecordsPage.tsx         # Página de recordes
│   │   └── TutorialPage.tsx        # Tutorial do jogo
│   ├── types/              # Definições de tipos TypeScript
│   │   ├── game.ts                 # Tipos do jogo
│   │   └── records.ts              # Tipos de recordes
│   ├── App.tsx             # Componente raiz
│   └── main.tsx            # Ponto de entrada
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
└── README.md               # Este arquivo
```

## 📜 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Compila para produção
npm run preview      # Visualiza build de produção
```

### Qualidade de Código
```bash
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
npm run check        # Executa lint + type-check
```

## 🛠 Desenvolvimento

### 🏗 Arquitetura

#### Hooks Customizados
- **useGame**: Gerencia estado do jogo padrão
- **useClassicGame**: Gerencia estado do jogo clássico com mecânicas especiais
- **useRecords**: Gerencia sistema de recordes com localStorage

#### Componentes Principais
- **MainMenu**: Menu principal com navegação
- **GamePage**: Container para modos avançado e gráficos
- **ClassicGamePage**: Container específico para modo clássico
- **GameNavbar**: Interface de jogo com informações em tempo real

#### Sistema de Roteamento
```typescript
Routes:
/              → MainMenu (Menu principal)
/classic       → ClassicGamePage (Modo clássico)
/game/:mode    → GamePage (Modos avançado/gráficos)
/records       → RecordsPage (Lista de recordes)
/tutorial      → TutorialPage (Tutorial do jogo)
/about         → AboutPage (Informações sobre o projeto)
```

### 🎨 Personalização

#### Configurações do Jogo
```typescript
// Modo Clássico
const gameConfig = {
  boardWidth: 50,        // Largura do tabuleiro
  boardHeight: 40,       // Altura do tabuleiro
  cellSize: 10,          // Tamanho das células
  initialSpeed: 250,     // Velocidade inicial (ms)
  speedIncrement: 10,    // Incremento de velocidade
  foodTimeout: 12,       // Tempo de expiração da comida (s)
};
```

#### Temas CSS
O projeto utiliza variáveis CSS para fácil customização:
```css
:root {
  --primary-color: #3b82f6;
  --background-gradient: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  --text-primary: #f8fafc;
  --text-secondary: #e2e8f0;
}
```

### 🔧 Extensibilidade

#### Adicionando Novos Modos
1. Crie um novo componente de jogo
2. Adicione a rota em `App.tsx`
3. Implemente a lógica no hook correspondente
4. Atualize o menu principal

#### Customizando Recordes
```typescript
// Adicione novos campos ao tipo GameRecord
interface GameRecord {
  // ... campos existentes
  customField?: string;
}
```

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de dependências**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Problemas de tipos TypeScript**
   ```bash
   npm run type-check
   ```

3. **Erros de lint**
   ```bash
   npm run lint
   ```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

1. Verifique os [Issues existentes](../../issues)
2. Crie um novo issue com detalhes do problema
3. Inclua informações sobre seu ambiente (OS, Node.js version, etc.)

---

**Desenvolvido com ❤️ usando React + TypeScript**