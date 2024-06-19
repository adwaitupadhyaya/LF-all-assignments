import { Fireboy } from "../classes/Fireboy";
import { Pond } from "../classes/Ponds";
import { Watergirl } from "../classes/Watergirl";

export function pondCollision(
  fireboy: Fireboy,
  watergirl: Watergirl,
  bluePond: Pond,
  redPond: Pond,
  greenPond: Pond
) {
  if (
    fireboy.feetX > bluePond.x &&
    fireboy.feetX < bluePond.x + 100 &&
    fireboy.feetY > bluePond.y &&
    fireboy.feetY < bluePond.y + bluePond.h
  ) {
    fireboy.resetPosition();
    watergirl.resetPosition();
  }

  if (
    watergirl.feetX > redPond.x &&
    watergirl.feetX < redPond.x + 100 &&
    watergirl.feetY > redPond.y &&
    watergirl.feetY < redPond.y + redPond.h
  ) {
    fireboy.resetPosition();
    watergirl.resetPosition();
  }
  if (
    (watergirl.feetX > greenPond.x &&
      watergirl.feetX < greenPond.x + 100 &&
      watergirl.feetY > greenPond.y &&
      watergirl.feetX < greenPond.y + 14) ||
    (fireboy.feetX > greenPond.x &&
      fireboy.feetX < greenPond.x + 100 &&
      fireboy.feetY > greenPond.y &&
      fireboy.feetY < greenPond.y + 14)
  ) {
    console.log("green pond  hit");
    fireboy.resetPosition();
    watergirl.resetPosition();
  }
}
