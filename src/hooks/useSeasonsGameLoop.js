import { useEffect, useState } from 'react';

const SPRING_COLOR = '#c6dabf';  // Soft green
const SPRING_BALL_COLOR = '#81b29a';
const SUMMER_COLOR = '#f2cc8f';  // Warm yellow
const SUMMER_BALL_COLOR = '#e88d67';
const AUTUMN_COLOR = '#e88d67';  // Orange
const AUTUMN_BALL_COLOR = '#b8695f';
const WINTER_COLOR = '#e0e1dd';  // Snow white
const WINTER_BALL_COLOR = '#3d405b';

const SQUARE_SIZE = 25;
const MIN_SPEED = 5;
const MAX_SPEED = 10;
const FRAME_RATE = 100;

export function useSeasonsGameLoop(canvasRef, scoreRef) {
  const [scores, setScores] = useState({ 
    springScore: 0, 
    summerScore: 0, 
    autumnScore: 0, 
    winterScore: 0 
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const numSquaresX = canvas.width / SQUARE_SIZE;
    const numSquaresY = canvas.height / SQUARE_SIZE;

    const squares = [];
    let iteration = 0;

    // Populate the fields in four quadrants
    for (let i = 0; i < numSquaresX; i++) {
      squares[i] = [];
      for (let j = 0; j < numSquaresY; j++) {
        if (i < numSquaresX / 2) {
          squares[i][j] = j < numSquaresY / 2 ? SPRING_COLOR : SUMMER_COLOR;
        } else {
          squares[i][j] = j < numSquaresY / 2 ? WINTER_COLOR : AUTUMN_COLOR;
        }
      }
    }

    const balls = [
      {
        x: canvas.width / 4,
        y: canvas.height / 4,
        dx: 8,
        dy: 8,
        reverseColor: SPRING_COLOR,
        ballColor: SPRING_BALL_COLOR,
      },
      {
        x: canvas.width / 4,
        y: (canvas.height / 4) * 3,
        dx: 8,
        dy: -8,
        reverseColor: SUMMER_COLOR,
        ballColor: SUMMER_BALL_COLOR,
      },
      {
        x: (canvas.width / 4) * 3,
        y: (canvas.height / 4) * 3,
        dx: -8,
        dy: -8,
        reverseColor: AUTUMN_COLOR,
        ballColor: AUTUMN_BALL_COLOR,
      },
      {
        x: (canvas.width / 4) * 3,
        y: canvas.height / 4,
        dx: -8,
        dy: 8,
        reverseColor: WINTER_COLOR,
        ballColor: WINTER_BALL_COLOR,
      },
    ];

    function drawBall(ball) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, SQUARE_SIZE / 2, 0, Math.PI * 2, false);
      ctx.fillStyle = ball.ballColor;
      ctx.fill();
      ctx.closePath();
    }

    function drawSquares() {
      let springScore = 0;
      let summerScore = 0;
      let autumnScore = 0;
      let winterScore = 0;

      for (let i = 0; i < numSquaresX; i++) {
        for (let j = 0; j < numSquaresY; j++) {
          ctx.fillStyle = squares[i][j];
          ctx.fillRect(i * SQUARE_SIZE, j * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);

          // Update scores
          if (squares[i][j] === SPRING_COLOR) springScore++;
          if (squares[i][j] === SUMMER_COLOR) summerScore++;
          if (squares[i][j] === AUTUMN_COLOR) autumnScore++;
          if (squares[i][j] === WINTER_COLOR) winterScore++;
        }
      }

      setScores({ springScore, summerScore, autumnScore, winterScore });
    }

    function checkSquareCollision(ball) {
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        const checkX = ball.x + Math.cos(angle) * (SQUARE_SIZE / 2);
        const checkY = ball.y + Math.sin(angle) * (SQUARE_SIZE / 2);

        const i = Math.floor(checkX / SQUARE_SIZE);
        const j = Math.floor(checkY / SQUARE_SIZE);

        if (i >= 0 && i < numSquaresX && j >= 0 && j < numSquaresY) {
          if (squares[i][j] !== ball.reverseColor) {
            squares[i][j] = ball.reverseColor;

            if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
              ball.dx = -ball.dx;
            } else {
              ball.dy = -ball.dy;
            }
          }
        }
      }
    }

    function checkBoundaryCollision(ball) {
      if (ball.x + ball.dx > canvas.width - SQUARE_SIZE / 2 || ball.x + ball.dx < SQUARE_SIZE / 2) {
        ball.dx = -ball.dx;
      }
      if (ball.y + ball.dy > canvas.height - SQUARE_SIZE / 2 || ball.y + ball.dy < SQUARE_SIZE / 2) {
        ball.dy = -ball.dy;
      }
    }

    function addRandomness(ball) {
      ball.dx += Math.random() * 0.02 - 0.01;
      ball.dy += Math.random() * 0.02 - 0.01;

      ball.dx = Math.min(Math.max(ball.dx, -MAX_SPEED), MAX_SPEED);
      ball.dy = Math.min(Math.max(ball.dy, -MAX_SPEED), MAX_SPEED);

      if (Math.abs(ball.dx) < MIN_SPEED) ball.dx = ball.dx > 0 ? MIN_SPEED : -MIN_SPEED;
      if (Math.abs(ball.dy) < MIN_SPEED) ball.dy = ball.dy > 0 ? MIN_SPEED : -MIN_SPEED;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSquares();

      balls.forEach((ball) => {
        drawBall(ball);
        checkSquareCollision(ball);
        checkBoundaryCollision(ball);
        ball.x += ball.dx;
        ball.y += ball.dy;

        addRandomness(ball);
      });

      iteration++;
      if (iteration % 1_000 === 0) console.log("iteration", iteration);
    }

    const interval = setInterval(draw, 1000 / FRAME_RATE);

    return () => clearInterval(interval);
  }, []);

  return scores;
}