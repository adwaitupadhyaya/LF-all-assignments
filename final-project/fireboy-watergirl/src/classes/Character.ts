import { playerDrawSize } from "../constants/constants";
import { OBSTACLE_TYPES } from "../constants/obstacleTypes";
import { Obstacle } from "./Obstacles";

export class Character {
  x: number;
  y: number;
  dx: number;
  dy: number;
  spriteHead: HTMLImageElement;
  spriteLeg: HTMLImageElement;
  frameX: number; // for sprite head animation
  frameY: number; // for sprite head animation direction
  legFrameX: number; // for leg animation
  legFrameY: number; // for leg animation
  maxFrame: number; // total frames in sprite sheet
  yVelocity: number;
  isJumping: boolean;
  jumpPower: number;
  gravity: number;
  ground: number;

  constructor(
    x: number,
    y: number,
    dx: number,
    dy: number,
    spriteHead: string,
    spriteLeg: string
  ) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.spriteHead = new Image();
    this.spriteHead.src = spriteHead;
    this.spriteLeg = new Image();
    this.spriteLeg.src = spriteLeg;
    this.frameX = 0;
    this.frameY = 0;
    this.legFrameX = 0;
    this.legFrameY = 0;
    this.maxFrame = 7; // 8 frames (0-7)

    this.yVelocity = 0;
    this.isJumping = false;
    this.jumpPower = 6.5;
    this.gravity = 0.2;
    this.ground = y;
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.yVelocity = this.jumpPower; // Initial jump velocity
    }
  }

  applyGravity(obstacleArray: Array<Obstacle>) {
    // Apply gravity
    this.yVelocity -= this.gravity;
    this.y -= this.yVelocity; // Update position

    // Check for collision with platforms
    let lowerPlatformY = Infinity;
    let onPlatform = false;

    obstacleArray.forEach((element) => {
      if (
        this.y + playerDrawSize === element.y &&
        this.x > element.x &&
        this.x < element.x + element.w
      ) {
        if (element.y < lowerPlatformY) {
          lowerPlatformY = element.y;
          onPlatform = true;
        }
      }
    });

    if (onPlatform) {
      this.ground = lowerPlatformY - playerDrawSize;
    }

    // Ensure player doesn't fall below ground level
    if (this.y >= this.ground) {
      this.y = this.ground;
      this.isJumping = false;
    }
  }

  handleCollision(obstacleArray: Array<Obstacle>) {
    let upperPlatformY = Infinity;

    obstacleArray.forEach((element) => {
      switch (element.id) {
        case OBSTACLE_TYPES.floor:
          if (
            this.y + playerDrawSize <= element.y &&
            this.x > element.x &&
            this.x < element.x + element.w
          ) {
            if (element.y < upperPlatformY) {
              upperPlatformY = element.y;
            }
          }
          break;
        case OBSTACLE_TYPES.wall:
          if (
            // rect1.x < rect2.x + rect2.w &&
            // rect1.x + rect1.w > rect2.x &&
            // rect1.y < rect2.y + rect2.h &&
            // rect1.y + rect1.h > rect2.y
            this.x + playerDrawSize > element.x &&
            this.x < element.x + element.w &&
            this.y < element.y + element.h &&
            this.y + playerDrawSize > element.y
          ) {
            console.log("wall hit");
            this.x = element.x - playerDrawSize;
          }
          break;
      }
    });

    this.ground = upperPlatformY - playerDrawSize;

    // Automatically fall if no platform detected below
    if (this.y > this.ground) {
      this.y += this.gravity;
    }
  }
}
