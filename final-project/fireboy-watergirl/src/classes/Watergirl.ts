import { Character } from "./Character";
import { WATERGIRL, playerDrawSize } from "../constants/constants";

export class Watergirl extends Character {
  width: number;
  height: number;

  constructor(spriteHead: string, spriteLeg: string) {
    super(
      WATERGIRL.DIMENSIONS.INITIAL_POSITION.X,
      WATERGIRL.DIMENSIONS.INITIAL_POSITION.Y,
      WATERGIRL.DIMENSIONS.SPEED.DX,
      WATERGIRL.DIMENSIONS.SPEED.DY,
      spriteHead,
      spriteLeg
    );

    this.width = WATERGIRL.DIMENSIONS.WIDTH;
    this.height = WATERGIRL.DIMENSIONS.HEIGHT;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();

    context.drawImage(
      this.spriteHead,
      this.frameX * WATERGIRL.DIMENSIONS.WIDTH,
      this.frameY * WATERGIRL.DIMENSIONS.HEIGHT,
      WATERGIRL.DIMENSIONS.WIDTH,
      WATERGIRL.DIMENSIONS.HEIGHT,
      this.x,
      this.y,
      playerDrawSize,
      playerDrawSize
    );

    // Draw legs
    context.drawImage(
      this.spriteLeg,
      this.legFrameX * WATERGIRL.LEGS.WIDTH,
      this.legFrameY * WATERGIRL.LEGS.HEIGHT,
      WATERGIRL.LEGS.WIDTH,
      WATERGIRL.LEGS.HEIGHT,
      this.x + WATERGIRL.DIMENSIONS.WIDTH / 2 - WATERGIRL.LEGS.WIDTH + 2,
      this.y + WATERGIRL.DIMENSIONS.HEIGHT / 2 + WATERGIRL.LEGS.HEIGHT / 2 - 5,
      WATERGIRL.LEGS.WIDTH,
      WATERGIRL.LEGS.HEIGHT
    );
  }

  update() {
    this.applyGravity();
  }

  updateWatergirlFrame() {
    this.frameY = 1;
    this.legFrameY = 1;
    this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
    this.legFrameX = (this.legFrameX + 1) % (this.maxFrame + 1);
  }
}
