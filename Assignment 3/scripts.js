class Ball {
  constructor(x, y, w, h, color) {
    this.x = `${x}px`;
    this.y = `${y}px`;
    this.w = `${w}px`;
    this.h = `${h}px`;
    this.color = color;
    this.newBall = document.createElement("div");
    this.borderRadius = "50%";
  }
}

// give styling to box
const ballBox = document.getElementById("box");
ballBox.style.position = "relative";

// create ball object
const ballObject = new Ball(10, 20, 50, 50, "green");

ballObject.newBall.style.backgroundColor = ballObject.color;
ballObject.newBall.style.width = ballObject.w;
ballObject.newBall.style.height = ballObject.h;
ballObject.newBall.style.top = ballObject.y;
ballObject.newBall.style.left = ballObject.x;
ballObject.newBall.style.position = "absolute";
ballObject.newBall.style.borderRadius = ballObject.borderRadius;

// add ball to box
ballBox.appendChild(ballObject.newBall);
