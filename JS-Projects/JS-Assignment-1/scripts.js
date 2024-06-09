// metadata
const BALL_BOX_HEIGHT = 100;
const BALL_BOX_WIDTH = 100;
const NUMBER_OF_BALLS = 20;
const FRAMES_PER_SECOND = 20;

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
  "red",
  "green",
  "yellow",
  "purple",
  "black",
  "gray",
  "orange",
  "aqua",
  "chocolate",
  "darkkhaki",
];

// give styling to box
const ballBox = document.getElementById("box");
ballBox.style.position = "relative";
ballBox.style.height = `${BALL_BOX_HEIGHT}%`;
ballBox.style.width = `${BALL_BOX_WIDTH}%`;

const ballsArray = [];
// randomize creation of ball

for (let i = 0; i < NUMBER_OF_BALLS; i++) {
  const randomColor = Math.round(Math.random() * 7);
  const randomRadius = Math.round(Math.random() * (30 - 10) + 10);
  const randomTop = Math.round(Math.random() * window.innerHeight);
  const randomLeft = Math.round(Math.random() * window.innerHeight);
  const randomDx = Math.round(Math.random() * 10);
  const randomDy = Math.round(Math.random() * 10);

  const ballObject = new Ball(
    randomTop,
    randomLeft,
    randomRadius,
    BALL_COLORS_ARRAY[randomColor],
    randomDx,
    randomDy
  );
  // add balls to box
  ballBox.appendChild(ballObject.newBall);
  // draw the initial state of the balls
  ballObject.drawBall();
  ballsArray.push(ballObject);
  setInterval(() => {
    moveBall(ballObject);
  }, FRAMES_PER_SECOND);
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

  // collision with other balls
  for (let i in ballsArray) {
    const ball = ballsArray[i];
    // checking of not the same ball
    if (ball !== ballToMove) {
      const distanceX = ballToMove.x - ball.x;
      const distanceY = ballToMove.y - ball.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      console.log(distance);
      if (distance < ball.radius + ballToMove.radius) {
        // give velocity + direction of one ball to another
        const tempDx = ballToMove.dx;
        const tempDy = ballToMove.dy;
        ballToMove.dx = ball.dx;
        ballToMove.dy = ball.dy;
        ball.dx = tempDx;
        ball.dy = tempDy;
      }
    }
  }
  ballToMove.drawBall();
};
