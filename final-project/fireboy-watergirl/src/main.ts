// import { OBSTACLE_TYPES } from "./constants/obstacleTypes";
import "./style.css";

// constants
import { LEVER } from "./constants/leverDimensions";
import { CANVAS } from "./constants/canvasDimensions";
import { allObstacles1, allObstacles2 } from "./constants/obstaclePoints";

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
import leverRight from "../public/images/leverRight.png";
import buttonImage from "../public/images/button.png";
import redDoorImage from "../public/images/red_door.png";
import blueDoorImage from "../public/images/blue_door.png";
import level2img from "/images/level2.png";
import woodImage from "/images/wood.png";

// classes
import { Fireboy } from "./classes/fireboy";
import { Watergirl } from "./classes/Watergirl";
import { Obstacle } from "./classes/Obstacles";
import { Pond } from "./classes/Ponds";
import { pondCollision } from "./utils/pondCollision";
import { Lever } from "./classes/Lever";
import { Button } from "./classes/button";
import { BUTTON } from "./constants/buttonDimensions";
import { DOOR } from "./constants/doorPositions";
import { Door } from "./classes/door";
import { WOOD } from "./constants/woodPosition";
import { level1Ponds, level2Ponds } from "./constants/pondPositions";
import { pondCollisionLevel2 } from "./utils/pondCollisionLevel2";
// import { playerDrawSize } from "./constants/constants";
export const obstacleArrayLevel1: Array<Obstacle> = [];
export const obstacleArrayLevel2: Array<Obstacle> = [];

let reqId: number;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let currentLevel = 2;

canvas.height = CANVAS.height;
canvas.width = CANVAS.width;

// obstacle definitions
allObstacles1.forEach((element) => {
  const obstacleObj1 = new Obstacle(
    element.x,
    element.y,
    element.w,
    element.h,
    element.id
  );
  obstacleArrayLevel1.push(obstacleObj1);
});
allObstacles2.forEach((element) => {
  const obstacleObj2 = new Obstacle(
    element.x,
    element.y,
    element.w,
    element.h,
    element.id
  );
  obstacleArrayLevel2.push(obstacleObj2);
});

const backgroundImage = new Image();
backgroundImage.src = bg;

const fireboy = new Fireboy(fireboyImageHead, fireboyImageLeg);
const watergirl = new Watergirl(watergirlImageHead, watergirlImageLeg);
const lever = new Lever(LEVER.leverPlatform, LEVER.leverController, leverRight);
const button = new Button(
  BUTTON.button1,
  BUTTON.button2,
  buttonImage,
  BUTTON.buttonPlatform
);
const doors = new Door(DOOR.DOOR1, DOOR.DOOR2, redDoorImage, blueDoorImage);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (currentLevel === 1) {
    let is1Complete = level1();
    if (is1Complete) {
      currentLevel = 2;
      fireboy.resetPosition();
      watergirl.resetPosition();
    }
  } else if (currentLevel === 2) {
    level2();
  }

  requestAnimationFrame(gameLoop);
}

function level1() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  const level1Image = new Image();
  level1Image.src = level1img;
  ctx.drawImage(level1Image, 0, 0, canvas.width, canvas.height);
  doors.draw(ctx);

  fireboy.draw(ctx);
  watergirl.draw(ctx);
  lever.draw(ctx);
  lever.checkLeverCollision(fireboy, watergirl);
  button.draw(ctx);
  button.checkButtonCollision(fireboy, watergirl);
  button.handleButtonPlatform(fireboy, watergirl);
  button.updateButtonPosition(fireboy);
  button.updateButtonPosition(watergirl);

  // Update character positions and handle collisions
  fireboy.update();
  watergirl.update();
  fireboy.handleCollision(obstacleArrayLevel1);
  watergirl.handleCollision(obstacleArrayLevel1);

  // initialize and draw ponds
  const bluePond = new Pond(
    level1Ponds.blue.x,
    level1Ponds.blue.y,
    level1Ponds.blue.w,
    level1Ponds.blue.h,
    waterImage
  );
  const redPond = new Pond(
    level1Ponds.red.x,
    level1Ponds.red.y,
    level1Ponds.red.w,
    level1Ponds.red.h,
    fireImage
  );
  const greenPond = new Pond(
    level1Ponds.green.x,
    level1Ponds.green.y,
    level1Ponds.green.w,
    level1Ponds.green.h,
    greenImage
  );
  bluePond.draw(ctx);
  redPond.draw(ctx);
  greenPond.draw(ctx);

  // handle pond collisions
  pondCollision(fireboy, watergirl, bluePond, redPond, greenPond, lever);

  let isCompleted = doors.checkDoorCollision(fireboy, watergirl);

  return isCompleted;
}

function level2() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  const level2Image = new Image();
  level2Image.src = level2img;
  ctx.drawImage(level2Image, 0, 0, canvas.width, canvas.height);

  fireboy.draw(ctx);
  watergirl.draw(ctx);

  fireboy.update();
  watergirl.update();
  fireboy.handleCollision(obstacleArrayLevel2);
  watergirl.handleCollision(obstacleArrayLevel2);

  const wood = new Image();
  wood.src = woodImage;

  // wood drawing
  ctx.drawImage(wood, WOOD.wood1.x, WOOD.wood1.y, WOOD.wood1.w, WOOD.wood1.h);
  ctx.drawImage(wood, WOOD.wood2.x, WOOD.wood2.y, WOOD.wood2.w, WOOD.wood2.h);
  const pondsArray = [];
  // level 2 ponds
  const bluePond1 = new Pond(
    level2Ponds.blue1.x,
    level2Ponds.blue1.y,
    level2Ponds.blue1.w,
    level2Ponds.blue1.h,
    waterImage
  );
  const bluePond2 = new Pond(
    level2Ponds.blue2.x,
    level2Ponds.blue2.y,
    level2Ponds.blue2.w,
    level2Ponds.blue2.h,
    waterImage
  );

  const redPond1 = new Pond(
    level2Ponds.red1.x,
    level2Ponds.red1.y,
    level2Ponds.red1.w,
    level2Ponds.red1.h,
    fireImage
  );
  const redPond2 = new Pond(
    level2Ponds.red2.x,
    level2Ponds.red2.y,
    level2Ponds.red2.w,
    level2Ponds.red2.h,
    fireImage
  );
  const greenPond1 = new Pond(
    level2Ponds.green1.x,
    level2Ponds.green1.y,
    level2Ponds.green1.w,
    level2Ponds.green1.h,
    greenImage
  );
  const greenPond2 = new Pond(
    level2Ponds.green2.x,
    level2Ponds.green2.y,
    level2Ponds.green2.w,
    level2Ponds.green2.h,
    greenImage
  );

  pondsArray.push(
    bluePond1,
    bluePond2,
    redPond1,
    redPond2,
    greenPond1,
    greenPond2
  );

  pondsArray.forEach((element) => {
    element.draw(ctx);
  });

  // handle pond collisions
  pondCollisionLevel2(
    fireboy,
    watergirl,
    bluePond1,
    bluePond2,
    redPond1,
    redPond2,
    greenPond1,
    greenPond2
  );
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
    default:
      break;
  }
});

function handleKeyPress() {
  if (keyState["d"]) {
    fireboy.updateFireboyFrame();
    fireboy.x += fireboy.dx;
    fireboy.spriteHead.src = fireboyImageHead;
  }
  if (keyState["a"]) {
    fireboy.updateFireboyFrame();
    fireboy.x -= fireboy.dx;
    fireboy.spriteHead.src = fireboyImageHeadRight;
  }
  if (keyState["ArrowRight"]) {
    watergirl.updateWatergirlFrame();
    watergirl.x += watergirl.dx;
    watergirl.spriteHead.src = watergirlImageHead;
  }
  if (keyState["ArrowLeft"]) {
    watergirl.updateWatergirlFrame();
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
