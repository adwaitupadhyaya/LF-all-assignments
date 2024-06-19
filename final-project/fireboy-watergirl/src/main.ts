// import { OBSTACLE_TYPES } from "./constants/obstacleTypes";
import "./style.css";

// constants
import { CANVAS } from "./constants/canvasDimensions";
import { allObstacles2 } from "./constants/obstaclePoints";
// sprites
import bg from "/images/bg.png";
import level1img from "/images/level1.png";
import fireboyImageHead from "../public/images/fireboy_sprite.png";
import fireboyImageHeadRight from "../public/images/fireboy_sprite-right.png";
import fireboyImageLeg from "../public/images/fireboy_legs_sprite.png";
import watergirlImageHead from "../public/images/watergirl_sprite.png";
import watergirlImageHeadRight from "../public/images/watergirl_sprite-right.png";
import watergirlImageLeg from "../public/images/watergirl_legs_sprite.png";
import waterImage from "../public/images/water_pond.png";
import fireImage from "../public/images/fire_pond.png";
import greenImage from "../public/images/green_pond.png";
// classes
import { Fireboy } from "./classes/Fireboy";
import { Watergirl } from "./classes/Watergirl";
import { Obstacle } from "./classes/Obstacles";
import { Pond } from "./classes/Ponds";
import { pondCollision } from "./utils/pondCollision";
// import { playerDrawSize } from "./constants/constants";
export const obstacleArray: Array<Obstacle> = [];
let reqId: number;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.height = CANVAS.height;
canvas.width = CANVAS.width;

const backgroundImage = new Image();
backgroundImage.src = bg;

const fireboy = new Fireboy(fireboyImageHead, fireboyImageLeg);
const watergirl = new Watergirl(watergirlImageHead, watergirlImageLeg);

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
  watergirl.draw(ctx);

  // Update character positions and handle collisions
  fireboy.update();
  watergirl.update();

  allObstacles2.forEach((element) => {
    const obstacleObj = new Obstacle(
      element.x,
      element.y,
      element.w,
      element.h,
      element.id
    );
    obstacleArray.push(obstacleObj);
    obstacleObj.draw(ctx, element);
  });
  fireboy.handleCollision(obstacleArray);
  watergirl.handleCollision(obstacleArray);

  // initialize and draw ponds
  const bluePond = new Pond(
    CANVAS.width / 2 - 26,
    CANVAS.height - 24,
    100,
    14,
    waterImage
  );
  const redPond = new Pond(
    CANVAS.width / 2 + 180,
    CANVAS.height - 24,
    100,
    14,
    fireImage
  );
  const greenPond = new Pond(
    CANVAS.width / 2 + 130,
    CANVAS.height - 24 * 7,
    100,
    14,
    greenImage
  );
  bluePond.draw(ctx);
  redPond.draw(ctx);
  greenPond.draw(ctx);

  // handle pond collisions
  pondCollision(fireboy, watergirl, bluePond, redPond, greenPond);
}

gameLoop();

// collision

// Object to keep track of the current state of each key
const keyState: { [key: string]: boolean } = {};

window.addEventListener("keydown", (event) => {
  keyState[event.key] = true; // Set the key state to true (pressed)
  handleKeyPress();
});

window.addEventListener("keyup", (event) => {
  cancelAnimationFrame(reqId);
  keyState[event.key] = false;
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
    case "ArrowLeft":
      watergirl.frameY = 0;
      watergirl.legFrameY = 0;
      watergirl.frameX = watergirl.maxFrame;
      watergirl.legFrameX = 0;
      break;
    case "ArrowRight":
      watergirl.frameY = 0;
      watergirl.legFrameY = 0;
      watergirl.frameX = 0;
      watergirl.legFrameX = 0;
      break;
    // case "w":
    //   fireboy.frameY = 0;
    //   break;
    default:
      break;
  }
});

function handleKeyPress() {
  if (keyState["d"]) {
    reqId = requestAnimationFrame(fireBoyMoveX);
    fireboy.x += fireboy.dx;
    fireboy.spriteHead.src = fireboyImageHead;
  }
  if (keyState["a"]) {
    reqId = requestAnimationFrame(fireBoyMoveX);
    fireboy.x -= fireboy.dx;
    fireboy.spriteHead.src = fireboyImageHeadRight;
  }
  if (keyState["ArrowRight"]) {
    reqId = requestAnimationFrame(watergirlMoveX);
    watergirl.x += watergirl.dx;
    watergirl.spriteHead.src = watergirlImageHead;
  }
  if (keyState["ArrowLeft"]) {
    reqId = requestAnimationFrame(watergirlMoveX);
    watergirl.x -= watergirl.dx;
    watergirl.spriteHead.src = watergirlImageHeadRight;
  }
  if (keyState["w"]) {
    fireboy.jump();
  }
  if (keyState["ArrowUp"]) {
    watergirl.jump();
  }
}

// Continuously update movement based on current key states
function updateMovement() {
  handleKeyPress();
  requestAnimationFrame(updateMovement);
}

// Start the update loop
updateMovement();

function fireBoyMoveX() {
  fireboy.updateFireboyFrame();
}

function watergirlMoveX() {
  watergirl.updateWatergirlFrame();
}
