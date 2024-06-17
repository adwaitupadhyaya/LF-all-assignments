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
  }

  updateFrame() {
    this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
    this.frameY = (this.frameY + 1) % (this.maxFrame + 1);
    this.legFrameX = (this.legFrameX + 1) % (this.maxFrame + 1);
    this.legFrameY = (this.legFrameY + 1) % (this.maxFrame + 1);
  }

  // draw(context: CanvasRenderingContext2D) {
  //   context.drawImage(
  //     this.spriteHead,
  //     this.frameX * 100,
  //     this.frameY * 100,
  //     100,
  //     100,
  //     this.x,
  //     this.y,
  //     100,
  //     100
  //   );
  // }
}
