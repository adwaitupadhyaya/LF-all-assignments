import { Fireboy } from "../classes/fireboy";
import { Lever } from "../classes/lever";
import { Pond } from "../classes/Ponds";
import { Watergirl } from "../classes/watergirl";

/**
 * The function `pondCollision` checks for collision between characters and ponds in a game and resets
 * their positions if a collision occurs.
 * @param {Fireboy} fireboy - Fireboy is an object representing a character in a game. The resetPosition method is used to reset the position of Fireboy.
 * @param {Watergirl} watergirl - Watergirl is a character in the game
 * @param {Pond} bluePond - The `bluePond` parameter represents a blue pond object in the game.
 * @param {Pond} redPond - The `redPond` parameter in the `pondCollision` function represents a red
 * pond object in the game environment.
 * @param {Pond} greenPond - The `greenPond` parameter in the `pondCollision` function represents a
 * green pond object in a game environment.
 * @param {Lever} lever - The `lever` parameter in the `pondCollision` function represents an object
 * that controls a lever platform in the game. When a collision occurs between the characters (Fireboy
 * and Watergirl) and the ponds (blue, red, green), the function resets the positions of the characters
 * and the lever platform
 */
export function pondCollision(
  fireboy: Fireboy,
  watergirl: Watergirl,
  bluePond: Pond,
  redPond: Pond,
  greenPond: Pond,
  lever: Lever
) {
  if (
    fireboy.feetX > bluePond.x &&
    fireboy.feetX < bluePond.x + 100 &&
    fireboy.feetY > bluePond.y &&
    fireboy.feetY < bluePond.y + bluePond.h
  ) {
    fireboy.resetPosition();
    watergirl.resetPosition();
    lever.resetLeverPlatform();
  }

  if (
    watergirl.feetX > redPond.x &&
    watergirl.feetX < redPond.x + 100 &&
    watergirl.feetY > redPond.y &&
    watergirl.feetY < redPond.y + redPond.h
  ) {
    fireboy.resetPosition();
    watergirl.resetPosition();
    lever.resetLeverPlatform();
  }

  if (
    watergirl.feetX > greenPond.x &&
    watergirl.feetX < greenPond.x + 100 &&
    watergirl.feetY > greenPond.y &&
    watergirl.feetY < greenPond.y + 14
  ) {
    fireboy.resetPosition();
    watergirl.resetPosition();
    lever.resetLeverPlatform();
  }
  if (
    fireboy.feetX > greenPond.x &&
    fireboy.feetX < greenPond.x + 100 &&
    fireboy.feetY > greenPond.y &&
    fireboy.feetY < greenPond.y + 14
  ) {
    fireboy.resetPosition();
    watergirl.resetPosition();
    lever.resetLeverPlatform();
  }
}
