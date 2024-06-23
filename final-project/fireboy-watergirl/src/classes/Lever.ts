/* The Lever class manages a lever object that can be interacted with by Fireboy and Watergirl
characters in a game. */
import { Fireboy } from "./fireboy";
import { Watergirl } from "./watergirl";
import leverLeft from "../../public/images/leverLeft.png";
import leverRight from "../../public/images/leverRight.png";
import { LEVER } from "../constants/leverDimensions";
import { Obstacle } from "./obstacles";
import { CANVAS } from "../constants/canvasDimensions";
const targetY = LEVER.leverPlatform.y + 90;
export class Lever {
  isActive: boolean;
  leverImage: HTMLImageElement;
  leverPlatform: Obstacle;
  leverController: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  constructor(
    leverPlatform: Obstacle,
    leverController: {
      x: number;
      y: number;
      w: number;
      h: number;
    },
    lever: string
  ) {
    this.leverPlatform = leverPlatform;
    this.leverController = leverController;
    this.leverImage = new Image();
    this.leverImage.src = lever;
    this.isActive = false;
  }
  /**
   * The draw function in TypeScript sets the fill style to white, fills a rectangle, and draws an image
   * on a canvas context.
   * @param {CanvasRenderingContext2D} ctx - CanvasRenderingContext2D is a built-in HTML5 object that
   * provides a 2D rendering context for the drawing surface of a <canvas> element. It is used to draw
   * shapes, text, images, and other objects onto the canvas.
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillRect(
      this.leverPlatform.x,
      this.leverPlatform.y,
      this.leverPlatform.w,
      this.leverPlatform.h
    );

    ctx.drawImage(
      this.leverImage,
      this.leverController.x,
      this.leverController.y,
      this.leverController.w,
      this.leverController.h
    );
  }

  /**
   * The function `checkLeverCollision` checks for collision between Fireboy and Watergirl with a lever
   * controller and triggers certain actions if a collision is detected.
   * @param {Fireboy} fireboy - The `fireboy` parameter represents an object of the `Fireboy` class,
   * which likely contains properties such as `x`, `y`, `width`, and `height` to define its position and
   * dimensions on the game screen.
   * @param {Watergirl} watergirl - Watergirl is an object representing a character or entity in a game,
   * likely a player character, with properties such as x and y coordinates, width, height, and methods
   * like handleCollision. In the provided function, the checkLeverCollision function checks for
   * collision between Watergirl and a leverController object
   */
  checkLeverCollision(fireboy: Fireboy, watergirl: Watergirl) {
    if (
      fireboy.x < this.leverController.x + this.leverController.w &&
      fireboy.x + fireboy.width > this.leverController.x &&
      fireboy.y < this.leverController.y + this.leverController.h &&
      fireboy.y + fireboy.height > this.leverController.y
    ) {
      this.isActive = true;
      this.leverImage.src = leverLeft;
      this.updatePlatformPosition();
      fireboy.handleCollision([this.leverPlatform]);
    }
    if (
      watergirl.x < this.leverController.x + this.leverController.w &&
      watergirl.x + watergirl.width > this.leverController.x &&
      watergirl.y < this.leverController.y + this.leverController.h &&
      watergirl.y + watergirl.height > this.leverController.y
    ) {
      this.isActive = true;
      this.leverImage.src = leverLeft;
      this.updatePlatformPosition();
      watergirl.handleCollision([this.leverPlatform]);
    }
  }

  updatePlatformPosition() {
    if (this.isActive) {
      if (this.leverPlatform.y < targetY) {
        this.leverPlatform.y++;
      }
    }
  }

  resetLeverPlatform() {
    this.leverPlatform.y = CANVAS.height / 2 + 12;
    this.leverImage.src = leverRight;
  }
}
