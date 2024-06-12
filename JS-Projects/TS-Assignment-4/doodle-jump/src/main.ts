import { DIMENSIONS } from "./constants";
import "./style.css";
import bg from "./assets/background.png";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

var background = new Image();
background.src = bg;

function draw() {
  background.onload = function () {
    ctx.drawImage(background, 0, 0);
  };

  requestAnimationFrame(draw);
}

draw();
