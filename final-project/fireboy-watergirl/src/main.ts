import "./style.css";
import { CANVAS } from "./constants/constants";
import bg from "/images/bg.png";
import level1img from "/images/level1.png";
import fireboyImageHead from "../public/images/fireboy_sprite.png";
import fireboyImageHeadRight from "../public/images/fireboy_sprite-right.png";
import fireboyImageLeg from "../public/images/fireboy_legs_sprite.png";
import { Fireboy } from "./classes/Fireboy";

let reqId: number;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.height = CANVAS.height;
canvas.width = CANVAS.width;

const backgroundImage = new Image();
backgroundImage.src = bg;

const fireboy = new Fireboy(fireboyImageHead, fireboyImageLeg);

function gameLoop() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  level1();
  requestAnimationFrame(gameLoop);
}

function level1() {
  const level1Image = new Image();
  level1Image.src = level1img;
  ctx.drawImage(level1Image, 0, 0, canvas.width, canvas.height);

  fireboy.draw(ctx);
}

gameLoop();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      reqId = requestAnimationFrame(updateAnimationFrame);
      fireboy.x += fireboy.dx;
      fireboy.spriteHead.src = fireboyImageHead;
      break;
    case "a":
      reqId = requestAnimationFrame(updateAnimationFrame);
      fireboy.x -= fireboy.dx;
      fireboy.spriteHead.src = fireboyImageHeadRight;
      break;
    default:
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      fireboy.frameY = 0;
      fireboy.legFrameY = 0;
      fireboy.frameX = 0;
      fireboy.legFrameX = 0;
      break;
    case "a":
      fireboy.frameY = 0;
      fireboy.legFrameY = 0;
      fireboy.frameX = fireboy.maxFrame;
      fireboy.legFrameX = 0;
      break;
    default:
      break;
  }
  // fireboy.frameY = 0;
  // fireboy.legFrameY = 0;
  // fireboy.frameX = 0;
  // fireboy.legFrameX = 0;
});

function updateAnimationFrame() {
  fireboy.frameY = 1;
  fireboy.legFrameY = 1;
  fireboy.frameX = (fireboy.frameX + 1) % (fireboy.maxFrame + 1);
  fireboy.legFrameX = (fireboy.legFrameX + 1) % (fireboy.maxFrame + 1);
}
