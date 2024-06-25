import { BUTTON_LEVEL_1, BUTTON_LEVEL_2 } from "../constants/buttonDimensions";
import { CANVAS } from "../constants/canvasDimensions";
import { playerDrawSize } from "../constants/constants";
import { buttonPlatformDetect } from "../utils/buttonPlatform";
import { Obstacle } from "./obstacles";
import { Watergirl } from "./watergirl";
import { Character } from "./character";
import { Fireboy } from "./fireboy";
const targetY = BUTTON_LEVEL_1.buttonPlatform.y + 90;
const targetX = BUTTON_LEVEL_2.buttonPlatform.x - 90;
/* The Button class in TypeScript defines properties and methods for handling button interactions and
collisions in a game environment. */
export class Button {
  isPressed: boolean;
  firstButton: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  secondButton: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  buttonPlatform: Obstacle;
  buttonImage: HTMLImageElement;

  constructor(
    firstButton: { x: number; y: number; w: number; h: number },
    secondButton: { x: number; y: number; w: number; h: number },
    buttonImage: string,
    buttonPlatform: Obstacle
  ) {
    this.firstButton = firstButton;
    this.secondButton = secondButton;
    this.buttonImage = new Image();
    this.buttonImage.src = buttonImage;
    this.buttonPlatform = buttonPlatform;
    this.isPressed = false;
  }

  /**
   * The draw function in TypeScript sets the fill style to purple, fills a rectangle, and draws two
   * images on a canvas context.
   * @param {CanvasRenderingContext2D} ctx - The `ctx` parameter in the `draw` function is of type
   * `CanvasRenderingContext2D`, which is a built-in HTML5 object that provides a 2D rendering context
   * for the drawing surface of a `<canvas>` element. This parameter is used to draw shapes, text, and
   * images on
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "purple";
    ctx.fillRect(
      this.buttonPlatform.x,
      this.buttonPlatform.y,
      this.buttonPlatform.w,
      this.buttonPlatform.h
    );
    ctx.drawImage(
      this.buttonImage,
      this.firstButton.x,
      this.firstButton.y,
      this.firstButton.w,
      this.firstButton.h
    );
    ctx.drawImage(
      this.buttonImage,
      this.secondButton.x,
      this.secondButton.y,
      this.secondButton.w,
      this.secondButton.h
    );
  }

  checkButtonCollision(fireboy: Fireboy, watergirl: Watergirl) {
    if (
      fireboy.feetX < this.firstButton.x + this.firstButton.w &&
      fireboy.feetX > this.firstButton.x &&
      fireboy.feetY < this.firstButton.y + this.firstButton.h &&
      fireboy.feetY > this.firstButton.y
    ) {
      this.isPressed = true;
    } else if (
      watergirl.feetX < this.firstButton.x + this.firstButton.w &&
      watergirl.feetX > this.firstButton.x &&
      watergirl.feetY < this.firstButton.y + this.firstButton.h &&
      watergirl.feetY > this.firstButton.y
    ) {
      this.isPressed = true;
    } else if (
      fireboy.feetX < this.secondButton.x + this.secondButton.w &&
      fireboy.feetX > this.secondButton.x &&
      fireboy.feetY < this.secondButton.y + this.secondButton.h &&
      fireboy.feetY > this.secondButton.y
    ) {
      this.isPressed = true;
    } else if (
      watergirl.feetX < this.secondButton.x + this.secondButton.w &&
      watergirl.feetX > this.secondButton.x &&
      watergirl.feetY < this.secondButton.y + this.secondButton.h &&
      watergirl.feetY > this.secondButton.y
    ) {
      this.isPressed = true;
    } else {
      this.isPressed = false;
      this.resetButtonPosition(fireboy);
      this.resetButtonPosition(watergirl);
      this.resetButtonHorizontal(fireboy);
      this.resetButtonHorizontal(watergirl);
    }
  }

  updateButtonPosition(player: Character) {
    if (this.isPressed) {
      if (this.buttonPlatform.y < targetY) {
        this.buttonPlatform.y++;
        if (player.onPlatform) {
          player.ground = this.buttonPlatform.y;
        }
      }
    }
  }

  updateButtonHorizontal(player: Character) {
    if (this.isPressed) {
      if (this.buttonPlatform.x > targetX) {
        this.buttonPlatform.x--;
        if (player.onPlatform) {
          player.ground = this.buttonPlatform.y;
        }
      }
    }
  }

  resetButtonPosition(player: Character) {
    if (this.buttonPlatform.y > CANVAS.height / 2 - 80) {
      this.buttonPlatform.y--;
      if (player.onPlatform) {
        player.ground = this.buttonPlatform.y;
        player.y = this.buttonPlatform.y - playerDrawSize;
      }
    }
  }

  resetButtonHorizontal(player: Character) {
    if (this.buttonPlatform.x < BUTTON_LEVEL_2.button2.x - 200) {
      this.buttonPlatform.x++;
      if (player.onPlatform) {
        player.ground = this.buttonPlatform.y - playerDrawSize;
      }
    }
  }

  handleButtonPlatform(fireboy: Fireboy, watergirl: Watergirl) {
    if (
      fireboy.x < this.buttonPlatform.x + this.buttonPlatform.w &&
      fireboy.x + fireboy.width > this.buttonPlatform.x &&
      fireboy.y < this.buttonPlatform.y + this.buttonPlatform.h &&
      fireboy.y + fireboy.height > this.buttonPlatform.y
    ) {
      buttonPlatformDetect([this.buttonPlatform], fireboy);
    }

    if (
      watergirl.x < this.buttonPlatform.x + this.buttonPlatform.w &&
      watergirl.x + watergirl.width > this.buttonPlatform.x &&
      watergirl.y < this.buttonPlatform.y + this.buttonPlatform.h &&
      watergirl.y + watergirl.height > this.buttonPlatform.y
    ) {
      buttonPlatformDetect([this.buttonPlatform], watergirl);
    }
  }
}