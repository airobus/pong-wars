import { useEffect, useRef } from 'react';
import { colorPalette } from './constants';
import { useGameLoop } from './hooks/useGameLoop';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const scoreRef = useRef(null);
  const { dayScore, nightScore } = useGameLoop(canvasRef, scoreRef);

  return (
    <div id="container">
      <canvas ref={canvasRef} id="pongCanvas" width="600" height="600" />
      <div ref={scoreRef} id="score">NEON {dayScore} | SHADOW {nightScore}</div>
      <p id="made">
        [SYSTEM] >> created by
        <a href="https://koenvangilst.nl/labs/pong-wars"> Koen van Gilst</a> | source:
        <a href="https://github.com/vnglst/pong-wars"> github</a>
      </p>
    </div>
  );
}

export default App;