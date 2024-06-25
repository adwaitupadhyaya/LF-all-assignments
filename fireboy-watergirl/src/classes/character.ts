import { playerDrawSize } from "../constants/constants";
import { OBSTACLE_TYPES } from "../constants/obstacleTypes";
import { obstacleArrayLevel1 } from "../main";
import { Obstacle } from "./obstacles";

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
  feetX: number;
  feetY: number;
  onPlatform: boolean;
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
    this.feetX = this.x + playerDrawSize / 2;
    this.feetY = this.y + playerDrawSize;
    this.onPlatform = false;
  }

  /**
   * The `jump` function sets the object to a jumping state and initializes its vertical velocity if it
   * is not already jumping.
   */
  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.yVelocity = this.jumpPower; // Initial jump velocity
    }
  }

  /**
   * The function applies gravity to a player object, checks for collision with platforms, and ensures
   * the player stays above the ground level.
   * @param obstacleArray - The `obstacleArray` parameter is an array containing objects of type
   * `Obstacle`. The function `applyGravity` is designed to simulate gravity acting on a player character
   * in a game environment. It updates the player's position based on gravity, checks for collisions with
   * platforms represented by obstacles in the `
   */
  applyGravity(obstacleArray: Array<Obstacle>) {
    // Apply gravity
    this.yVelocity -= this.gravity;
    this.y -= this.yVelocity; // Update position

    // Check for collision with platforms
    let lowerPlatformY = Infinity;
    let onPlatformButton = false;

    obstacleArray.forEach((element) => {
      if (
        this.y + playerDrawSize === element.y &&
        this.x > element.x &&
        this.x < element.x + element.w
      ) {
        if (element.y < lowerPlatformY) {
          lowerPlatformY = element.y;
          onPlatformButton = true;
        }
      }
    });

    if (onPlatformButton) {
      this.ground = lowerPlatformY - playerDrawSize;
    }

    // Ensure player doesn't fall below ground level
    if (this.y >= this.ground) {
      this.y = this.ground;
      this.isJumping = false;
    }
  }

  /**
   * The function `handleCollision` checks for collisions with different types of obstacles and adjusts
   * the player's position and velocity accordingly.
   * @param obstacleArray - An array containing obstacles that the player character may collide with.
   * Each obstacle in the array has properties such as id (identifying the type of obstacle), x
   * (x-coordinate), y (y-coordinate), w (width), and h (height). The function `handleCollision` checks
   * for collisions between the
   */
  handleCollision(obstacleArray: Array<Obstacle>) {
    let upperPlatformY = Infinity;
    let lowerPlatformY = Infinity;

    obstacleArray.forEach((element) => {
      switch (element.id) {
        case OBSTACLE_TYPES.floor:
          // Check for collision from above
          if (
            this.feetY <= element.y &&
            this.feetX > element.x &&
            this.feetX < element.x + element.w
          ) {
            if (element.y < upperPlatformY) {
              upperPlatformY = element.y;
            }
          }
          // Check for collision from below
          else if (
            this.y <= element.y + element.h &&
            this.feetY > element.y + element.h &&
            this.feetX > element.x &&
            this.feetX < element.x + element.w
          ) {
            if (element.y + element.h > lowerPlatformY) {
              lowerPlatformY = element.y + element.h;
            }
          }
          break;
        case OBSTACLE_TYPES.wall:
          // ... (keep existing wall collision logic)
          break;
        case OBSTACLE_TYPES.forwardSlope:
          // ... (implement slope collision if needed)
          break;
      }
    });

    // Handle collision from above
    if (upperPlatformY !== Infinity) {
      this.ground = upperPlatformY - playerDrawSize;
      if (this.y > this.ground) {
        this.y = this.ground;
        this.yVelocity = 0;
        this.isJumping = false;
      }
    }

    // Handle collision from below
    if (lowerPlatformY !== Infinity && this.yVelocity > 0) {
      this.y = lowerPlatformY;
      this.yVelocity = 0;
    }

    // Automatically fall if no platform detected below
    if (this.y > this.ground && upperPlatformY === Infinity) {
      this.y += this.gravity;
    }
  }

  /**
   * The update function applies gravity to the player and updates the player's feet position.
   */
  update() {
    this.applyGravity(obstacleArrayLevel1);
    this.feetX = this.x + playerDrawSize / 2;
    this.feetY = this.y + playerDrawSize;
  }
}
