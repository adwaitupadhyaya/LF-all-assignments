import { playerDrawSize } from "../constants/constants";
import { allObstacles2 } from "../constants/obstaclePoints";
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

  applyGravity() {
    if (this.isJumping) {
      this.yVelocity -= this.gravity; // Apply gravity
      this.y -= this.yVelocity; // Update position
    } else {
      this.yVelocity = 0; // Reset yVelocity when not jumping
    }

    // Check if character has landed
    if (this.y >= this.ground) {
      this.y = this.ground;
      this.isJumping = false;
    }
  }

  handleCollision(obstacleArray: Array<Obstacle>) {
    let upperPlatformY = Infinity;
    let lowerPlatformY = Infinity;
    let onUpperPlatform = false;

    obstacleArray.forEach((element) => {
      switch (element.id) {
        case OBSTACLE_TYPES.floor:
          if (
            this.y + playerDrawSize <= element.y &&
            this.x > element.x &&
            this.x < element.x + element.w
          ) {
            // Check if this platform is higher than the current upper platform
            if (element.y < upperPlatformY) {
              upperPlatformY = element.y; // Update the upper platform Y value
              onUpperPlatform = true;
            }
          } else if (
            this.y + playerDrawSize > element.y &&
            this.y <= element.y + element.h &&
            this.x > element.x &&
            this.x < element.x + element.w
          ) {
            // Check if the player is above this platform
            if (element.y < lowerPlatformY) {
              lowerPlatformY = element.y;
            }
          }

          break;
        case OBSTACLE_TYPES.wall:
          // Handle wall collision logic if needed
          break;
        case OBSTACLE_TYPES.corner:
          // Handle corner collision logic if needed
          break;
        case OBSTACLE_TYPES.backwardSlope:
          // Handle backward slope collision logic if needed
          break;
        case OBSTACLE_TYPES.forwardSlope:
          // Handle forward slope collision logic if needed
          break;
        default:
          break;
      }
    });

    if (onUpperPlatform) {
      this.ground = upperPlatformY - playerDrawSize;
    } else if (
      this.y + playerDrawSize === upperPlatformY &&
      !obstacleArray.some(
        (element) =>
          element.y === upperPlatformY &&
          this.x > element.x &&
          this.x < element.x + element.w
      )
    ) {
      this.ground = lowerPlatformY - playerDrawSize;
    }

    if (this.y >= this.ground) {
      this.y = this.ground;
      this.isJumping = false;
    }
  }
}
