import { Character } from "./character";
import { WATERGIRL, playerDrawSize } from "../constants/constants";
import { CANVAS } from "../constants/canvasDimensions";

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

  /**
   * The draw function in TypeScript draws the Watergirl character sprite, legs, and a blue circle at a
   * specific position on a canvas context.
   * @param {CanvasRenderingContext2D} context - The `context` parameter in the `draw` function is of
   * type `CanvasRenderingContext2D`. This parameter represents the drawing context on the canvas where
   * the images and shapes will be drawn. It provides methods and properties to draw on the canvas, such
   * as `drawImage` for drawing images and `
   */
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

    // Draw the midpoint
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(this.feetX, this.feetY, 5, 0, 2 * Math.PI);
    context.fill();
    context.restore();
  }

  /**
   * The function `updateWatergirlFrame` increments the frame and leg frame positions for an animation of
   * a character.
   */
  updateWatergirlFrame() {
    this.frameY = 1;
    this.legFrameY = 1;
    this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
    this.legFrameX = (this.legFrameX + 1) % (this.maxFrame + 1);
  }

  /**
   * The resetPosition function sets the x and y coordinates of an object to specific values.
   */
  resetPosition() {
    this.x = 60;
    this.y = 800;
    this.feetX = this.x + playerDrawSize / 2;
    this.feetY = this.y + playerDrawSize;
  }

  /**
   * The function `resetForLevel3` sets the player's position and feet position for level 3 in a game.
   */
  resetForLevel3() {
    this.x = CANVAS.width - 200;
    this.y = CANVAS.height - 30;
    this.feetX = this.x + playerDrawSize / 2;
    this.feetY = this.y + playerDrawSize;
  }
}
