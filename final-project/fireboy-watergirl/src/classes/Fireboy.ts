import { Character } from "./Character";
import { FIREBOY, playerDrawSize } from "../constants/constants";

export class Fireboy extends Character {
  constructor(spriteHead: string, spriteLeg: string) {
    super(
      FIREBOY.DIMENSIONS.INITIAL_POSITION.X,
      FIREBOY.DIMENSIONS.INITIAL_POSITION.Y,
      FIREBOY.DIMENSIONS.SPEED.DX,
      FIREBOY.DIMENSIONS.SPEED.DY,
      spriteHead,
      spriteLeg
    );

    // Set the ground level to the initial y position
    this.ground = FIREBOY.DIMENSIONS.INITIAL_POSITION.Y;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();

    // context.scale(-1, 1);
    // moving right
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
    context.strokeStyle = "red";
    context.strokeRect(this.x, this.y, 80, 80);
    context.strokeRect(this.x, this.y, 80, 80);
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
    context.strokeRect(
      this.x + FIREBOY.DIMENSIONS.WIDTH / 2 - FIREBOY.LEGS.WIDTH + 2,
      this.y + FIREBOY.DIMENSIONS.HEIGHT / 2 + FIREBOY.LEGS.HEIGHT / 2 - 5,
      FIREBOY.LEGS.WIDTH,
      FIREBOY.LEGS.HEIGHT
    );

    context.restore();
  }

  updateFireboyFrame() {
    this.frameY = 1;
    this.legFrameY = 1;
    this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
    this.legFrameX = (this.legFrameX + 1) % (this.maxFrame + 1);
  }

  // Update method to apply gravity
  update() {
    this.applyGravity();
  }
}
