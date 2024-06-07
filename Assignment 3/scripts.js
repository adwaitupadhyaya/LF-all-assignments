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
      this.newBall.style.width = `${this.radius}px`;
      this.newBall.style.height = `${this.radius}px`;
      this.newBall.style.top = `${this.y}px`;
      this.newBall.style.left = `${this.x}px`;
      this.newBall.style.position = "absolute";
      this.newBall.style.borderRadius = this.borderRadius;
    };
  }
}

const BALL_BOX_HEIGHT = 500;
const BALL_BOX_WIDTH = 500;
const NUMBER_OF_BALLS = 10;

const BALL_COLORS_ARRAY = [
  "red",
  "green",
  "yellow",
  "purple",
  "black",
  "gray",
  "orange",
];
// give styling to box
const ballBox = document.getElementById("box");
ballBox.style.position = "relative";
ballBox.style.height = `${BALL_BOX_HEIGHT}px`;
ballBox.style.width = `${BALL_BOX_WIDTH}px`;

// randomize creation of ball

for (let i = 0; i < NUMBER_OF_BALLS; i++) {
  const randomColor = Math.round(Math.random() * 7);
  const randomRadius = Math.round(Math.random() * (100 - 10) + 10);
  const randomTop = Math.round(Math.random() * BALL_BOX_HEIGHT);
  const randomLeft = Math.round(Math.random() * BALL_BOX_WIDTH - 100);
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
  setInterval(() => {
    moveBall(ballObject);
  }, 20);
}

const moveBall = (ballToMove) => {
  ballToMove.y += ballToMove.dy;
  ballToMove.x += ballToMove.dx;
  if (ballToMove.y + ballToMove.radius > BALL_BOX_HEIGHT || ballToMove.y < 0) {
    ballToMove.dy = -1 * ballToMove.dy;
  }

  if (ballToMove.x + ballToMove.radius > BALL_BOX_WIDTH || ballToMove.x < 0) {
    ballToMove.dx = -1 * ballToMove.dx;
  }

  ballToMove.drawBall();
};
