import { CANVAS } from "../constants/canvasDimensions";
import { playerDrawSize } from "../constants/constants";
import { pulleyPlatformDetect } from "../utils/pulleyPlatform";
import { Fireboy } from "./fireboy";
import { Obstacle } from "./obstacles";
import { Watergirl } from "./watergirl";

const pulley1Target: number = CANVAS.height / 2;
const pulley2Target: number = 100;

export class Pulley {
  pulleyPlatform1: Obstacle;
  pulleyPlatform2: Obstacle;
  isActive: boolean;

  constructor(pulleyPlatform1: Obstacle, pulleyPlatform2: Obstacle) {
    this.pulleyPlatform1 = pulleyPlatform1;
    this.pulleyPlatform2 = pulleyPlatform2;
    this.isActive = false;
  }

  /**
   * The draw function in TypeScript sets the fill style and draws two rectangles on a canvas context
   * representing pulley platforms.
   * @param {CanvasRenderingContext2D} ctx - The `ctx` parameter in the `draw` function is of type
   * `CanvasRenderingContext2D`, which is a built-in HTML5 object that provides a 2D rendering context
   * for the drawing surface of a `<canvas>` element. This parameter is used to draw shapes, text,
   * images, and
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgb(197,197,197)";
    ctx.fillRect(
      this.pulleyPlatform1.x,
      this.pulleyPlatform1.y,
      this.pulleyPlatform1.w,
      this.pulleyPlatform1.h
    );
    ctx.fillRect(
      this.pulleyPlatform2.x,
      this.pulleyPlatform2.y,
      this.pulleyPlatform2.w,
      this.pulleyPlatform2.h
    );
  }

  /**
   * The `handlePulleyPlatform` function checks if Fireboy or Watergirl is on a pulley platform and
   * triggers corresponding actions.
   * @param {Fireboy} fireboy - The `handlePulleyPlatform` function takes two parameters `fireboy` and
   * `watergirl`, which are objects representing characters in a game. The function checks if the
   * `fireboy` or `watergirl` is colliding with specific pulley platforms (`pulleyPlatform1` and
   * @param {Watergirl} watergirl - The `watergirl` parameter in the `handlePulleyPlatform` function
   * represents an object of the `Watergirl` class. It is used to check for collision detection with the
   * pulley platforms (`pulleyPlatform1` and `pulleyPlatform2`) in the game environment.
   */
  handlePulleyPlatform(fireboy: Fireboy, watergirl: Watergirl) {
    if (
      fireboy.x < this.pulleyPlatform1.x + this.pulleyPlatform1.w &&
      fireboy.x + fireboy.width > this.pulleyPlatform1.x &&
      fireboy.y < this.pulleyPlatform1.y + this.pulleyPlatform1.h &&
      fireboy.y + fireboy.height > this.pulleyPlatform1.y
    ) {
      pulleyPlatformDetect([this.pulleyPlatform1], fireboy);
      this.isActive = true;
      this.handleActiveCondition(watergirl);
    }

    if (
      watergirl.x < this.pulleyPlatform2.x + this.pulleyPlatform2.w &&
      watergirl.x + watergirl.width > this.pulleyPlatform2.x &&
      watergirl.y < this.pulleyPlatform2.y + this.pulleyPlatform2.h &&
      watergirl.y + watergirl.height > this.pulleyPlatform2.y
    ) {
      pulleyPlatformDetect([this.pulleyPlatform2], watergirl);
    }
  }
  /**
   * The function `handleActiveCondition` adjusts the positions of two pulley platforms based on certain
   * conditions and updates the watergirl's ground position accordingly.
   * @param {Watergirl} watergirl - Watergirl is an object representing a character or entity in the
   * game, likely a player-controlled character named Watergirl.
   */
  handleActiveCondition(watergirl: Watergirl) {
    if (this.isActive) {
      if (this.pulleyPlatform1.y < pulley1Target) {
        this.pulleyPlatform1.y++;
      }
      if (this.pulleyPlatform2.y > pulley2Target) {
        this.pulleyPlatform2.y--;
        {
          watergirl.ground = this.pulleyPlatform2.y - playerDrawSize;
        }
      }
    }
  }

  /**
   * The `resetPosition` function sets the x and y coordinates of two pulley platforms to specific
   * values.
   */
  resetPosition() {
    this.pulleyPlatform1.x = 120;
    this.pulleyPlatform1.y = 150;
    this.pulleyPlatform2.x = CANVAS.width - 140;
    this.pulleyPlatform2.y = CANVAS.height - 50;
  }
}
