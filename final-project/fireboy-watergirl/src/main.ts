// import { OBSTACLE_TYPES } from "./constants/obstacleTypes";
import "./style.css";

// constants
import { LEVER } from "./constants/leverDimensions";
import { CANVAS } from "./constants/canvasDimensions";
import {
  allObstacles1,
  allObstacles2,
  allObstacles3,
} from "./constants/obstaclePoints";

// sprites
import bg from "/images/bg.png";
import level1img from "/images/level1.png";
import fireboyImageHead from "/images/fireboy_sprite.png";
import fireboyImageHeadRight from "/images/fireboy_sprite-right.png";
import fireboyImageLeg from "/images/fireboy_legs_sprite.png";
import watergirlImageHead from "/images/watergirl_sprite.png";
import watergirlImageHeadRight from "/images/watergirl_sprite-right.png";
import watergirlImageLeg from "/images/watergirl_legs_sprite.png";
import waterImage from "/images/water_pond.png";
import fireImage from "/images/fire_pond.png";
import greenImage from "/images/green_pond.png";
import leverRight from "/images/leverRight.png";
import buttonImage from "/images/button.png";
import redDoorImage from "/images/red_door.png";
import blueDoorImage from "/images/blue_door.png";
import level2img from "/images/level2.png";
import woodImage from "/images/wood.png";
import launchpadImg from "/images/launchpad.png";
import level3img from "/images/level3.png";
import blueGemImg from "/images/blue_gem.png";
import redGemImg from "/images/red_gem.png";

// classes
import { Fireboy } from "./classes/fireboy";
import { Watergirl } from "./classes/watergirl";
import { Obstacle } from "./classes/obstacles";
import { Pond } from "./classes/Ponds";
import { pondCollision } from "./utils/pondCollision";
import { Lever } from "./classes/lever";
import { Button } from "./classes/button";
import { BUTTON_LEVEL_1, BUTTON_LEVEL_2 } from "./constants/buttonDimensions";
import { DOOR, DOOR_LEVEL_2, DOOR_LEVEL_3 } from "./constants/doorPositions";
import { Door } from "./classes/door";
import { WOOD } from "./constants/woodPosition";
import {
  level1Ponds,
  level2Ponds,
  level3Ponds,
} from "./constants/pondPositions";
import { pondCollisionLevel2 } from "./utils/pondCollisionLevel2";
import { Launchpad } from "./classes/launchpad";
import { LAUNCHPAD } from "./constants/launchpadDimensions";
import { Pulley } from "./classes/pulley";
import { PULLEY } from "./constants/pulleyDimensions";
import { pondCollisionLevel3 } from "./utils/pondCollisionLevel3";
import { Gems } from "./classes/gems";
import { LEVEL_1_GEMS } from "./constants/gemPositions";
// import { playerDrawSize } from "./constants/constants";
export const obstacleArrayLevel1: Array<Obstacle> = [];
export const obstacleArrayLevel2: Array<Obstacle> = [];
export const obstacleArrayLevel3: Array<Obstacle> = [];

const gemsArrayLevel1: Array<Gems> = [];
const gemsArrayLevel2: Array<Gems> = [];
const gemsArrayLevel3: Array<Gems> = [];

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let currentLevel = 1;

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
allObstacles3.forEach((element) => {
  const obstacleObj3 = new Obstacle(
    element.x,
    element.y,
    element.w,
    element.h,
    element.id
  );
  obstacleArrayLevel3.push(obstacleObj3);
});

// gems definitions
LEVEL_1_GEMS.forEach((element) => {
  let image: string;
  if (element.id === "red") {
    image = redGemImg;
  } else {
    image = blueGemImg;
  }
  const gemObject = new Gems(
    element.x,
    element.y,
    element.w,
    element.h,
    image,
    element.id
  );
  gemsArrayLevel1.push(gemObject);
});

const backgroundImage = new Image();
backgroundImage.src = bg;

const fireboy = new Fireboy(fireboyImageHead, fireboyImageLeg);
const watergirl = new Watergirl(watergirlImageHead, watergirlImageLeg);
const lever = new Lever(LEVER.leverPlatform, LEVER.leverController, leverRight);
const buttonLevel1 = new Button(
  BUTTON_LEVEL_1.button1,
  BUTTON_LEVEL_1.button2,
  buttonImage,
  BUTTON_LEVEL_1.buttonPlatform
);
const buttonLevel2 = new Button(
  BUTTON_LEVEL_2.button1,
  BUTTON_LEVEL_2.button2,
  buttonImage,
  BUTTON_LEVEL_2.buttonPlatform
);

const doorsLevel1 = new Door(
  DOOR.DOOR1,
  DOOR.DOOR2,
  redDoorImage,
  blueDoorImage
);

const doorsLevel2 = new Door(
  DOOR_LEVEL_2.DOOR1,
  DOOR_LEVEL_2.DOOR2,
  redDoorImage,
  blueDoorImage
);

const doorsLevel3 = new Door(
  DOOR_LEVEL_3.DOOR1,
  DOOR_LEVEL_3.DOOR2,
  redDoorImage,
  blueDoorImage
);

const launchpad = new Launchpad(
  LAUNCHPAD.x,
  LAUNCHPAD.y,
  LAUNCHPAD.w,
  LAUNCHPAD.h,
  launchpadImg
);

let reqId: number;
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
    let is2completed = level2();
    if (is2completed) {
      currentLevel = 3;
      fireboy.resetForLevel3();
      watergirl.resetForLevel3();
    }
  } else if (currentLevel === 3) {
    let is3Completed = level3();

    if (is3Completed) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const text = "Congratulations you finished the game";
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, CANVAS.width / 2, CANVAS.height / 2);
    }
  }

  requestAnimationFrame(gameLoop);
}

// levels (export to classes when refactoring)
function level1() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  const level1Image = new Image();
  level1Image.src = level1img;
  ctx.drawImage(level1Image, 0, 0, canvas.width, canvas.height);
  doorsLevel1.draw(ctx);

  gemsArrayLevel1.forEach((element) => {
    element.draw(ctx);
    element.detectCollision(fireboy, gemsArrayLevel1);
    element.detectCollision(watergirl, gemsArrayLevel1);
  });

  fireboy.draw(ctx);
  watergirl.draw(ctx);
  lever.draw(ctx);
  lever.checkLeverCollision(fireboy, watergirl);
  buttonLevel1.draw(ctx);
  buttonLevel1.checkButtonCollision(fireboy, watergirl);
  buttonLevel1.handleButtonPlatform(fireboy, watergirl);
  buttonLevel1.updateButtonPosition(fireboy);
  buttonLevel1.updateButtonPosition(watergirl);
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

  if (gemsArrayLevel1.length === 0) {
    let is1Completed = doorsLevel1.checkDoorCollision(fireboy, watergirl);
    return is1Completed;
  }
}

function level2() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  const level2Image = new Image();
  level2Image.src = level2img;
  ctx.drawImage(level2Image, 0, 0, canvas.width, canvas.height);
  doorsLevel2.draw(ctx);

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

  buttonLevel2.draw(ctx);
  buttonLevel2.checkButtonCollision(fireboy, watergirl);
  buttonLevel2.handleButtonPlatform(fireboy, watergirl);
  buttonLevel2.updateButtonHorizontal(fireboy);
  buttonLevel2.updateButtonHorizontal(watergirl);

  launchpad.draw(ctx);
  launchpad.checkSwooshPosition(fireboy);
  launchpad.checkSwooshPosition(watergirl);

  let is2Completed = doorsLevel2.checkDoorCollision(fireboy, watergirl);

  return is2Completed;
}

function level3() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  const level3Image = new Image();
  level3Image.src = level3img;
  ctx.drawImage(level3Image, 0, 0, canvas.width, canvas.height);
  doorsLevel3.draw(ctx);
  fireboy.draw(ctx);
  watergirl.draw(ctx);
  fireboy.update();
  watergirl.update();
  fireboy.handleCollision(obstacleArrayLevel3);
  watergirl.handleCollision(obstacleArrayLevel3);

  const pulley = new Pulley(PULLEY.pulley1, PULLEY.pulley2);
  pulley.draw(ctx);
  pulley.handlePulleyPlatform(fireboy, watergirl);

  const pondsArrayLevel3 = [];
  // level 3 ponds:
  const bluePond1 = new Pond(
    level3Ponds.blue1.x,
    level3Ponds.blue1.y,
    level3Ponds.blue1.w,
    level3Ponds.blue1.h,
    waterImage
  );
  const bluePond2 = new Pond(
    level3Ponds.blue2.x,
    level3Ponds.blue2.y,
    level3Ponds.blue2.w,
    level3Ponds.blue2.h,
    waterImage
  );
  const bluePond3 = new Pond(
    level3Ponds.blue3.x,
    level3Ponds.blue3.y,
    level3Ponds.blue3.w,
    level3Ponds.blue3.h,
    waterImage
  );

  const redPond1 = new Pond(
    level3Ponds.red1.x,
    level3Ponds.red1.y,
    level3Ponds.red1.w,
    level3Ponds.red1.h,
    fireImage
  );
  const redPond2 = new Pond(
    level3Ponds.red2.x,
    level3Ponds.red2.y,
    level3Ponds.red2.w,
    level3Ponds.red2.h,
    fireImage
  );
  const redPond3 = new Pond(
    level3Ponds.red3.x,
    level3Ponds.red3.y,
    level3Ponds.red3.w,
    level3Ponds.red3.h,
    fireImage
  );

  pondsArrayLevel3.push(
    bluePond1,
    bluePond2,
    bluePond3,
    redPond1,
    redPond2,
    redPond3
  );

  pondsArrayLevel3.forEach((element) => {
    element.draw(ctx);
  });

  // handle pond collisions
  pondCollisionLevel3(
    fireboy,
    watergirl,
    bluePond1,
    bluePond2,
    bluePond3,
    redPond1,
    redPond2,
    redPond3,
    pulley
  );

  let is3Completed = doorsLevel3.checkDoorCollision(fireboy, watergirl);
  return is3Completed;
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
    default:
      break;
  }
});

function handleKeyPress() {
  if (keyState["d"]) {
    fireboy.updateFireboyFrame();
    if (fireboy.feetX < CANVAS.width - 24) {
      fireboy.x += fireboy.dx;
    }
    fireboy.spriteHead.src = fireboyImageHead;
  }
  if (keyState["a"]) {
    fireboy.updateFireboyFrame();
    if (fireboy.feetX > 24) {
      fireboy.x -= fireboy.dx;
    }
    fireboy.spriteHead.src = fireboyImageHeadRight;
  }
  if (keyState["ArrowRight"]) {
    watergirl.updateWatergirlFrame();
    if (watergirl.feetX < CANVAS.width - 24) {
      watergirl.x += watergirl.dx;
    }
    watergirl.spriteHead.src = watergirlImageHead;
  }
  if (keyState["ArrowLeft"]) {
    watergirl.updateWatergirlFrame();
    if (watergirl.feetX > 24) {
      watergirl.x -= watergirl.dx;
    }
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
