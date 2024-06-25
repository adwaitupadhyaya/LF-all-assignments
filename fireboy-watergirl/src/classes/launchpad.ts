import { SWOOSH } from "../constants/launchpadDimensions";
import { Watergirl } from "./watergirl";
import { Fireboy } from "./fireboy";
import swooshImg from "/images/swoosh.png";
const playerTarget = SWOOSH.y;
export class Launchpad {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
  swooshImage: HTMLImageElement;

  constructor(x: number, y: number, w: number, h: number, sprite: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = new Image();
    this.image.src = sprite;
    this.swooshImage = new Image();
    this.swooshImage.src = swooshImg;
  }

  /**
   * The draw function in TypeScript draws an image on a canvas context with a specified global alpha
   * value and also draws another image with a different alpha value.
   * @param {CanvasRenderingContext2D} ctx - The `ctx` parameter in the `draw` function is of type
   * `CanvasRenderingContext2D`, which is a built-in HTML5 object representing a two-dimensional
   * rendering context. It is used to draw shapes, text, images, and other objects onto the canvas
   * element in the HTML document.
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    ctx.globalAlpha = 0.2;
    ctx.drawImage(this.swooshImage, SWOOSH.x, SWOOSH.y, SWOOSH.w, SWOOSH.h);
    ctx.globalAlpha = 1;
  }

  /**
   * The function `checkSwooshPosition` checks if a player's feet are within the boundaries of a swoosh
   * object and updates the players accordingly.
   * @param {Fireboy | Watergirl} player - Fireboy | Watergirl
   */
  checkSwooshPosition(player: Fireboy | Watergirl) {
    if (
      player.feetX < SWOOSH.x + SWOOSH.w &&
      player.feetX > SWOOSH.x &&
      player.feetY < SWOOSH.y + SWOOSH.h + this.h &&
      player.feetY > SWOOSH.y
    ) {
      this.updatePlayers(player);
    }
  }

  /**
   * The function updates the position and velocity of a player object based on a target position.
   * @param {Fireboy | Watergirl} player - The `player` parameter in the `updatePlayers` function seems
   * to represent an object with properties related to a game character. In this case, it has properties
   * such as `y`, `isJumping`, and `yVelocity`. The function updates the player's position and properties
   * based on certain conditions
   */
  updatePlayers(player: Fireboy | Watergirl) {
    if (player.y > playerTarget) {
      player.y -= 0.9;
      player.isJumping = false;
      player.yVelocity *= -1;
    }
  }
}
