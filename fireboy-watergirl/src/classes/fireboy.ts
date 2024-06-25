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

  /**
   * The draw function in TypeScript draws the player sprite, legs, and a blue circle at a specified
   * position on a canvas.
   * @param {CanvasRenderingContext2D} context - The `context` parameter in the `draw` function is of
   * type `CanvasRenderingContext2D`. This parameter represents the drawing context on the canvas where
   * you can draw shapes, images, text, and more using various methods provided by the Canvas API. In the
   * provided code snippet, the `drawImage
   */
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

  /**
   * The function `updateFireboyFrame` increments the frameX and legFrameX properties while resetting
   * frameY and legFrameY to 1.
   */
  updateFireboyFrame() {
    this.frameY = 1;
    this.legFrameY = 1;
    this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
    this.legFrameX = (this.legFrameX + 1) % (this.maxFrame + 1);
  }

  /**
   * The `resetPosition` function sets the x and y coordinates of an object to specific values and
   * calculates the position of its feet based on the playerDrawSize.
   */
  resetPosition() {
    this.x = 55;
    this.y = 800;
    this.feetX = this.x + playerDrawSize / 2;
    this.feetY = this.y + playerDrawSize;
  }

  /**
   * The function `resetForLevel3` sets the x and y coordinates for a player character in a game.
   */
  resetForLevel3() {
    this.x = 24;
    this.y = 24 * 2;
    this.feetX = this.x + playerDrawSize / 2;
    this.feetY = this.y + playerDrawSize;
  }
}
