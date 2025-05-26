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
    </div>
  );
}

export default SeasonsPong;