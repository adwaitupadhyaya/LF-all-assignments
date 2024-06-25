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

  /**
   * The function `checkButtonCollision` checks if either Fireboy or Watergirl is colliding with a button
   * and updates the `isPressed` status accordingly.
   * @param {Fireboy} fireboy - The `fireboy` parameter seems to represent an object or entity named
   * Fireboy in your game or application. It likely has properties such as `feetX` and `feetY` which are
   * used to determine its position, and it seems to interact with buttons represented by `firstButton`
   * @param {Watergirl} watergirl - The `watergirl` parameter in the `checkButtonCollision` function
   * seems to represent an object of the `Watergirl` class or type in your game. This object likely has
   * properties such as `feetX` and `feetY` representing the position of Watergirl's feet, which
   */
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

  /**
   * The function updates the position of a button platform based on a target Y coordinate and adjusts
   * the player's position if they are on the platform.
   * @param {Character} player - The `player` parameter is of type `Character`, which likely represents a
   * character or object in the game that can interact with the button and platform.
   */
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

  /**
   * The function `updateButtonHorizontal` decreases the x position of a button platform if it is pressed
   * and updates the player's ground position if they are on the platform.
   * @param {Character} player - The `player` parameter is of type `Character`, which likely represents a
   * character or object in the game that will be affected by the `updateButtonHorizontal` function.
   */
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

  /**
   * The function `resetButtonPosition` adjusts the position of a button platform and a player character
   * based on certain conditions.
   * @param {Character} player - The `player` parameter is of type `Character`, which likely represents a
   * character or object in a game. This function `resetButtonPosition` seems to be related to adjusting
   * the position of a button platform and updating the player's position accordingly when the button
   * platform is above a certain height on the canvas
   */
  resetButtonPosition(player: Character) {
    if (this.buttonPlatform.y > CANVAS.height / 2 - 80) {
      this.buttonPlatform.y--;
      if (player.onPlatform) {
        player.ground = this.buttonPlatform.y;
        player.y = this.buttonPlatform.y - playerDrawSize;
      }
    }
  }

  /**
   * The function `resetButtonHorizontal` moves a button platform horizontally and adjusts the player's
   * position if they are on the platform.
   * @param {Character} player - The `player` parameter in the `resetButtonHorizontal` function is of
   * type `Character`. This function seems to be related to resetting the horizontal position of a button
   * platform based on the player's position on the platform. If the button platform's x-coordinate is
   * less than a certain threshold relative to another
   */
  resetButtonHorizontal(player: Character) {
    if (this.buttonPlatform.x < BUTTON_LEVEL_2.button2.x - 200) {
      this.buttonPlatform.x++;
      if (player.onPlatform) {
        player.ground = this.buttonPlatform.y - playerDrawSize;
      }
    }
  }

  /**
   * The function `handleButtonPlatform` checks if the positions of Fireboy and Watergirl intersect with
   * a button platform and triggers a detection function accordingly.
   * @param {Fireboy} fireboy - Fireboy is an object representing a character in a game. It likely has
   * properties such as x and y coordinates, width, and height that are used to determine its position
   * and interactions with other elements in the game.
   * @param {Watergirl} watergirl - Watergirl is a character object representing a player or avatar in a
   * game. In the provided code snippet, the `handleButtonPlatform` function takes two parameters:
   * `fireboy` and `watergirl`, which are instances of the `Fireboy` and `Watergirl` classes
   * respectively. These parameters
   */
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
