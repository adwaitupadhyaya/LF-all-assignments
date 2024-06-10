// metadata
const BALL_BOX_HEIGHT = 100;
const BALL_BOX_WIDTH = 100;
const NUMBER_OF_BALLS = 300;

class Ball {
  constructor(x, y, radius, color, dy, dx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.borderRadius = "50%";
    this.dy = dy;
    this.dx = dx;

    this.newBall = document.createElement("div");
    // create styling to ball
    this.drawBall = () => {
      this.newBall.style.backgroundColor = this.color;
      this.newBall.style.width = `${this.radius * 2}px`;
      this.newBall.style.height = `${this.radius * 2}px`;
      this.newBall.style.top = `${this.y - this.radius}px`;
      this.newBall.style.left = `${this.x - this.radius}px`;
      this.newBall.style.position = "absolute";
      this.newBall.style.borderRadius = this.borderRadius;
    };
  }
}

const BALL_COLORS_ARRAY = [
  "#FF5733",
  "#33FF57",
  "#5733FF",
  "#FFC300",
  "#C70039",
  "#900C3F",
  "#581845",
  "#FF69B4",
  "#8A2BE2",
  "#00CED1",
  "#FFD700",
  "#FF4500",
  "#2E8B57",
  "#FF1493",
  "#7FFF00",
  "#DC143C",
  "#4682B4",
  "#DAA520",
  "#FF8C00",
  "#ADFF2F",
];

// give styling to box
const ballBox = document.getElementById("box");
ballBox.style.position = "relative";
ballBox.style.height = `${BALL_BOX_HEIGHT}%`;
ballBox.style.width = `${BALL_BOX_WIDTH}%`;

const balls = [];

// Function to check if two balls overlap
const doBallsOverlap = (ball1, ball2) => {
  const dx = ball1.x - ball2.x;
  const dy = ball1.y - ball2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < ball1.radius + ball2.radius;
};

const handleBallCollision = (ball1, ball2) => {
  const distanceX = ball1.x - ball2.x;
  const distanceY = ball1.y - ball2.y;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  const overlap = ball1.radius + ball2.radius - distance;

  ball1.x += overlap;
  ball1.y += overlap;
  ball2.x -= overlap;
  ball2.y -= overlap;

  //exchange velocities
  const tempDx = ball1.dx;
  const tempDy = ball1.dy;
  ball1.dx = ball2.dx;
  ball1.dy = ball2.dy;
  ball2.dx = tempDx;
  ball2.dy = tempDy;
};

// randomize creation of ball
for (let i = 0; i < NUMBER_OF_BALLS; i++) {
  let randomColor = Math.round(Math.random() * BALL_COLORS_ARRAY.length);
  let randomRadius = Math.round(Math.random() * (7 - 4) + 4);
  let randomTop, randomLeft;
  let ballObject, overlaps;

  do {
    overlaps = false;
    randomTop = Math.round(Math.random() * window.innerHeight);
    randomLeft = Math.round(Math.random() * window.innerWidth);
    ballObject = new Ball(
      randomLeft,
      randomTop,
      randomRadius,
      BALL_COLORS_ARRAY[randomColor],
      Math.round(Math.random() * 7) + 1,
      Math.round(Math.random() * 7) + 1
    );

    // Check for overlaps with existing balls
    for (let j = 0; j < balls.length; j++) {
      if (doBallsOverlap(ballObject, balls[j])) {
        overlaps = true;
        break;
      }
    }
  } while (overlaps);

  ballBox.appendChild(ballObject.newBall);
  ballObject.drawBall();
  balls.push(ballObject);
  setInterval(() => {
    moveBall(ballObject);
  }, 20);
}

const moveBall = (ballToMove) => {
  ballToMove.y += ballToMove.dy;
  ballToMove.x += ballToMove.dx;

  // Check for collisions with walls
  if (ballToMove.y + ballToMove.radius > window.innerHeight) {
    ballToMove.y = window.innerHeight - ballToMove.radius;
    ballToMove.dy = -ballToMove.dy;
  }
  if (ballToMove.y - ballToMove.radius < 0) {
    ballToMove.y = ballToMove.radius;
    ballToMove.dy = -ballToMove.dy;
  }
  if (ballToMove.x + ballToMove.radius > window.innerWidth) {
    ballToMove.x = window.innerWidth - ballToMove.radius;
    ballToMove.dx = -ballToMove.dx;
  }
  if (ballToMove.x - ballToMove.radius < 0) {
    ballToMove.x = ballToMove.radius;
    ballToMove.dx = -ballToMove.dx;
  }

  // Check for collisions with other balls
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    if (ball !== ballToMove && doBallsOverlap(ballToMove, ball)) {
      handleBallCollision(ballToMove, ball);
    }
  }

  ballToMove.drawBall();
};
