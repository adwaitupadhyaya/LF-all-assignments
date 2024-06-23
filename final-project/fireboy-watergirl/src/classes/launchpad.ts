import { SWOOSH } from "../constants/launchpadDimensions";
import { Watergirl } from "./Watergirl";
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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    ctx.globalAlpha = 0.2;
    ctx.drawImage(this.swooshImage, SWOOSH.x, SWOOSH.y, SWOOSH.w, SWOOSH.h);
    ctx.globalAlpha = 1;
  }

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

  updatePlayers(player: Fireboy | Watergirl) {
    if (player.y > playerTarget) {
      player.y -= 0.9;
      player.isJumping = false;
      player.yVelocity *= -1;
    }
  }
}
