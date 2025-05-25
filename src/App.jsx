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
      <div ref={scoreRef} id="score">day {dayScore} | night {nightScore}</div>
      <p id="made">
        made by
        <a href="https://koenvangilst.nl/labs/pong-wars">Koen van Gilst</a> | source on
        <a href="https://github.com/vnglst/pong-wars">github</a>
      </p>
    </div>
  );
}