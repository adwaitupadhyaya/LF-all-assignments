import watergirlImageHeadRight from "/images/watergirl_sprite-right.png";
import fireboyImageHeadRight from "/images/fireboy_sprite-right.png";
import { CANVAS } from "../constants/canvasDimensions";
import { Fireboy } from "../classes/fireboy";
import { Watergirl } from "../classes/watergirl";
import fireboyImageHead from "/images/fireboy_sprite.png";
import watergirlImageHead from "/images/watergirl_sprite.png";

/**
 * The function `handleKeyPress` takes in key states and updates the positions and sprites of Fireboy
 * and Watergirl characters based on the keys pressed.
 * @param keyState - The `keyState` parameter is an object that represents the current state of
 * keyboard keys. Each key is a property in the object, with the key name as the property name and a
 * boolean value indicating whether the key is currently pressed (`true`) or not pressed (`false`).
 * @param {Fireboy} fireboy - The `fireboy` parameter in the `handleKeyPress` function represents an
 * object that contains properties and methods related to the character Fireboy in a game. This object
 * likely includes information such as Fireboy's position (`x`, `feetX`), movement speed (`dx`), sprite
 * images (`
 * @param {Watergirl} watergirl - The `watergirl` parameter in the `handleKeyPress` function represents
 * an object of the `Watergirl` class. This object likely contains properties and methods related to
 * the Watergirl character in a game or application. The function uses this object to update
 * Watergirl's position and sprite based on the keys
 */
export function handleKeyPress(
  keyState: { [key: string]: boolean },
  fireboy: Fireboy,
  watergirl: Watergirl
) {
  if (keyState["d"]) {
    fireboy.updateFireboyFrame();
    if (fireboy.feetX < CANVAS.width - 24) {
      fireboy.x += fireboy.dx;
    }
    fireboy.spriteHead.src = fireboyImageHead;
  }
  if (keyState["a"]) {
    fireboy.updateFireboyFrame();
    if (fireboy.feetX > 24) {
      fireboy.x -= fireboy.dx;
    }
    fireboy.spriteHead.src = fireboyImageHeadRight;
  }
  if (keyState["ArrowRight"]) {
    watergirl.updateWatergirlFrame();
    if (watergirl.feetX < CANVAS.width - 24) {
      watergirl.x += watergirl.dx;
    }
    watergirl.spriteHead.src = watergirlImageHead;
  }
  if (keyState["ArrowLeft"]) {
    watergirl.updateWatergirlFrame();
    if (watergirl.feetX > 24) {
      watergirl.x -= watergirl.dx;
    }
    watergirl.spriteHead.src = watergirlImageHeadRight;
  }
  if (keyState["w"]) {
    fireboy.jump();
  }
  if (keyState["ArrowUp"]) {
    watergirl.jump();
  }
}
