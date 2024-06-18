import "./style.css";

// constants
import { CANVAS } from "./constants/constants";
import { allObstacles } from "./constants/obstaclePoints";
// sprites
import bg from "/images/bg.png";
import level1img from "/images/level1.png";
import fireboyImageHead from "../public/images/fireboy_sprite.png";
import fireboyImageHeadRight from "../public/images/fireboy_sprite-right.png";
import fireboyImageLeg from "../public/images/fireboy_legs_sprite.png";
import watergirlImageHead from "../public/images/watergirl_sprite.png";
import watergirlImageHeadRight from "../public/images/watergirl_sprite-right.png";
import watergirlImageLeg from "../public/images/watergirl_legs_sprite.png";

// classes
import { Fireboy } from "./classes/Fireboy";
import { Watergirl } from "./classes/Watergirl";
import { Obstacle } from "./classes/Obstacles";
import { OBSTACLE_TYPES } from "./constants/obstacleTypes";

let reqId: number;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.height = CANVAS.height;
canvas.width = CANVAS.width;

const backgroundImage = new Image();
backgroundImage.src = bg;

const fireboy = new Fireboy(fireboyImageHead, fireboyImageLeg);
const watergirl = new Watergirl(watergirlImageHead, watergirlImageLeg);

const obstacles: Array<Obstacle> = [];

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

  // handling jump
  fireboy.update();
  watergirl.update();

  const obstacle1 = new Obstacle(
    allObstacles.obstacle1.x,
    allObstacles.obstacle1.y,
    allObstacles.obstacle1.w,
    allObstacles.obstacle1.h,
    OBSTACLE_TYPES.floor
  );
  const obstacle2 = new Obstacle(
    allObstacles.obstacle2.x,
    allObstacles.obstacle2.y,
    allObstacles.obstacle2.w,
    allObstacles.obstacle2.h,
    OBSTACLE_TYPES.floor
  );
  const obstacle3 = new Obstacle(
    allObstacles.obstacle3.x,
    allObstacles.obstacle3.y,
    allObstacles.obstacle3.w,
    allObstacles.obstacle3.h,
    OBSTACLE_TYPES.wall
  );
  const obstacle4 = new Obstacle(
    allObstacles.obstacle4.x,
    allObstacles.obstacle4.y,
    allObstacles.obstacle4.w,
    allObstacles.obstacle4.h,
    OBSTACLE_TYPES.forwardSlope
  );
  const obstacle5 = new Obstacle(
    allObstacles.obstacle5.x,
    allObstacles.obstacle5.y,
    allObstacles.obstacle5.w,
    allObstacles.obstacle5.h,
    OBSTACLE_TYPES.floor
  );
  const obstacle6 = new Obstacle(
    allObstacles.obstacle6.x,
    allObstacles.obstacle6.y,
    allObstacles.obstacle6.w,
    allObstacles.obstacle6.h,
    OBSTACLE_TYPES.wall
  );
  const obstacle7 = new Obstacle(
    allObstacles.obstacle7.x,
    allObstacles.obstacle7.y,
    allObstacles.obstacle7.w,
    allObstacles.obstacle7.h,
    OBSTACLE_TYPES.backwardSlope
  );
  const obstacle8 = new Obstacle(
    allObstacles.obstacle8.x,
    allObstacles.obstacle8.y,
    allObstacles.obstacle8.w,
    allObstacles.obstacle8.h,
    OBSTACLE_TYPES.floor
  );
  const obstacle9 = new Obstacle(
    allObstacles.obstacle9.x,
    allObstacles.obstacle9.y,
    allObstacles.obstacle9.w,
    allObstacles.obstacle9.h,
    OBSTACLE_TYPES.forwardSlope
  );
  const obstacle10 = new Obstacle(
    allObstacles.obstacle10.x,
    allObstacles.obstacle10.y,
    allObstacles.obstacle10.w,
    allObstacles.obstacle10.h,
    OBSTACLE_TYPES.floor
  );
  const obstacle11 = new Obstacle(
    allObstacles.obstacle11.x,
    allObstacles.obstacle11.y,
    allObstacles.obstacle11.w,
    allObstacles.obstacle11.h,
    OBSTACLE_TYPES.backwardSlope
  );

  obstacles.push(
    obstacle1,
    obstacle2,
    obstacle3,
    obstacle4,
    obstacle5,
    obstacle6,
    obstacle7,
    obstacle8,
    obstacle9,
    obstacle10,
    obstacle11
  );
  obstacles.forEach((element) => {
    element.draw(ctx, element);
  });
}

gameLoop();

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
  fireboy.frameY = 1;
  fireboy.legFrameY = 1;
  fireboy.frameX = (fireboy.frameX + 1) % (fireboy.maxFrame + 1);
  fireboy.legFrameX = (fireboy.legFrameX + 1) % (fireboy.maxFrame + 1);
}

function watergirlMoveX() {
  watergirl.frameY = 1;
  watergirl.legFrameY = 1;
  watergirl.frameX = (watergirl.frameX + 1) % (watergirl.maxFrame + 1);
  watergirl.legFrameX = (watergirl.legFrameX + 1) % (watergirl.maxFrame + 1);
}
