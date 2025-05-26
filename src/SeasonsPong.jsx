import { useEffect, useRef } from 'react';
import { useSeasonsGameLoop } from './hooks/useSeasonsGameLoop';
import './SeasonsPong.css';

function SeasonsPong() {
  const canvasRef = useRef(null);
  const scoreRef = useRef(null);
  const { springScore, summerScore, autumnScore, winterScore } = useSeasonsGameLoop(canvasRef, scoreRef);

  return (
    <div id="seasons-container">
      <canvas ref={canvasRef} id="seasonsCanvas" width="600" height="600" />
      <div ref={scoreRef} id="seasons-score">
        spring {springScore} | summer {summerScore} | autumn {autumnScore} | winter {winterScore}
      </div>
      <p id="seasons-made">
        four seasons edition | made by
        <a href="https://koenvangilst.nl/labs/pong-wars">Koen van Gilst</a>
      </p>
    </div>
  );
}

export default SeasonsPong;