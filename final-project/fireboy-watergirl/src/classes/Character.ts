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
      if (this.y >= this.ground) {
        // Check if character has landed
        this.y = this.ground;
        this.isJumping = false;
        this.yVelocity = 0;
      }
    }
  }
}
