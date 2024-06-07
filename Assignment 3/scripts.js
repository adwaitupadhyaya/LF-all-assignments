class Ball {
  constructor(x, y, w, h, color, dy, dx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.borderRadius = "50%";
    this.dy = dy;
    this.dx = dx;

    this.newBall = document.createElement("div");
    // create styling to ball
    this.drawBall = () => {
      this.newBall.style.backgroundColor = ballObject.color;
      this.newBall.style.width = `${ballObject.w}px`;
      this.newBall.style.height = `${ballObject.h}px`;
      this.newBall.style.top = `${ballObject.y}px`;
      this.newBall.style.left = `${ballObject.x}px`;
      this.newBall.style.position = "absolute";
      this.newBall.style.borderRadius = ballObject.borderRadius;
    };
  }
}

const BALL_BOX_HEIGHT = 700;
const BALL_BOX_WIDTH = 700;

// give styling to box
const ballBox = document.getElementById("box");
ballBox.style.position = "relative";
ballBox.style.height = `${BALL_BOX_HEIGHT}px`;
ballBox.style.width = `${BALL_BOX_WIDTH}px`;

// create ball object
const ballObject = new Ball(10, 20, 50, 50, "green", 10, 3);

// add ball to box
let isGreen = true;

setInterval(() => {
  ballObject.y += ballObject.dy;
  ballObject.x += ballObject.dx;
  if (ballObject.y + ballObject.h > BALL_BOX_HEIGHT || ballObject.y < 0) {
    ballObject.dy = -1 * ballObject.dy;
  }

  if (ballObject.x + ballObject.w > BALL_BOX_WIDTH || ballObject.x < 0) {
    ballObject.dx = -1 * ballObject.dx;
  }

  console.log("here");
  ballObject.drawBall();
}, 20);

ballBox.appendChild(ballObject.newBall);
