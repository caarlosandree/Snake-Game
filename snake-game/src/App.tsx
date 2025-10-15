import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainMenu from './pages/MainMenu';
import GamePage from './pages/GamePage';
import ClassicGamePage from './pages/ClassicGamePage';
import RecordsPage from './pages/RecordsPage';
import TutorialPage from './pages/TutorialPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game/:gameMode" element={<GamePage />} />
          <Route path="/classic" element={<ClassicGamePage />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
