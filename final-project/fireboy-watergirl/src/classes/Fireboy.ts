import { Character } from "./character";
import { FIREBOY, playerDrawSize } from "../constants/constants";

export class Fireboy extends Character {
  width: number;
  height: number;

  constructor(spriteHead: string, spriteLeg: string) {
    super(
      FIREBOY.DIMENSIONS.INITIAL_POSITION.X,
      FIREBOY.DIMENSIONS.INITIAL_POSITION.Y,
      FIREBOY.DIMENSIONS.SPEED.DX,
      FIREBOY.DIMENSIONS.SPEED.DY,
      spriteHead,
      spriteLeg
    );

    this.width = FIREBOY.DIMENSIONS.WIDTH;
    this.height = FIREBOY.DIMENSIONS.HEIGHT;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.drawImage(
      this.spriteHead,
      this.frameX * FIREBOY.DIMENSIONS.WIDTH,
      this.frameY * FIREBOY.DIMENSIONS.HEIGHT,
      FIREBOY.DIMENSIONS.WIDTH,
      FIREBOY.DIMENSIONS.HEIGHT,
      this.x,
      this.y,
      playerDrawSize,
      playerDrawSize
    );
    context.strokeStyle = "blue";
    context.strokeRect(this.x, this.y, playerDrawSize, playerDrawSize);

    // Draw legs
    context.drawImage(
      this.spriteLeg,
      this.legFrameX * FIREBOY.LEGS.WIDTH,
      this.legFrameY * FIREBOY.LEGS.HEIGHT,
      FIREBOY.LEGS.WIDTH,
      FIREBOY.LEGS.HEIGHT,
      this.x + FIREBOY.DIMENSIONS.WIDTH / 2 - FIREBOY.LEGS.WIDTH + 2,
      this.y + FIREBOY.DIMENSIONS.HEIGHT / 2 + FIREBOY.LEGS.HEIGHT / 2 - 5,
      FIREBOY.LEGS.WIDTH,
      FIREBOY.LEGS.HEIGHT
    );

    // Draw the midpoint
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(this.feetX, this.feetY, 5, 0, 2 * Math.PI);
    context.fill();
    context.restore();
  }

  updateFireboyFrame() {
    this.frameY = 1;
    this.legFrameY = 1;
    this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
    this.legFrameX = (this.legFrameX + 1) % (this.maxFrame + 1);
  }

  resetPosition() {
    this.x = FIREBOY.DIMENSIONS.INITIAL_POSITION.X;
    this.y = FIREBOY.DIMENSIONS.INITIAL_POSITION.Y;
  }
}
