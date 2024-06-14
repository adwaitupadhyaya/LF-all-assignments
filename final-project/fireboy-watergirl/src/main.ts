import "./style.css";
// Constant Imports
import { CANVAS } from "./constants/constants";

// Photo Imports
import bg from "../public/images/bg.png";
import level1img from "../public/images/level1.png";

// Class Imports

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.height = CANVAS.height;
canvas.width = CANVAS.width;

const backgroundImage = new Image();
backgroundImage.src = bg;

function gameLoop() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  level1();
  requestAnimationFrame(gameLoop);
}

function level1() {
  const level1Image = new Image();
  level1Image.src = level1img;
  ctx.drawImage(level1Image, 0, 0, canvas.width, canvas.height);
}

gameLoop();
