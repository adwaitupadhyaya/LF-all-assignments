import { Fireboy } from "../classes/fireboy";
import { Pond } from "../classes/Ponds";
import { Watergirl } from "../classes/Watergirl";
export function pondCollisionLevel2(
  fireboy: Fireboy,
  watergirl: Watergirl,
  bluePond1: Pond,
  bluePond2: Pond,
  redPond1: Pond,
  redPond2: Pond,
  greenPond1: Pond,
  greenPond2: Pond
) {
  if (
    (fireboy.feetX > bluePond1.x &&
      fireboy.feetX < bluePond1.x + bluePond1.w &&
      fireboy.feetY > bluePond1.y - 10 &&
      fireboy.feetY < bluePond1.y + bluePond1.h) ||
    (fireboy.feetX > bluePond2.x &&
      fireboy.feetX < bluePond2.x + bluePond2.w &&
      fireboy.feetY > bluePond2.y &&
      fireboy.feetY < bluePond2.y + bluePond2.h)
  ) {
    console.log("blue pond hit");
    fireboy.resetPosition();
    watergirl.resetPosition();
  }

  if (
    (watergirl.feetX > redPond1.x &&
      watergirl.feetX < redPond1.x + redPond1.w &&
      watergirl.feetY > redPond1.y &&
      watergirl.feetY < redPond1.y + redPond1.h) ||
    (watergirl.feetX > redPond2.x &&
      watergirl.feetX < redPond2.x + redPond2.w &&
      watergirl.feetY > redPond2.y - 10 &&
      watergirl.feetY < redPond2.y + redPond2.h)
  ) {
    fireboy.resetPosition();
    watergirl.resetPosition();
  }

  if (
    (watergirl.feetX > greenPond1.x &&
      watergirl.feetX < greenPond1.x + greenPond1.w &&
      watergirl.feetY > greenPond1.y &&
      watergirl.feetY < greenPond1.y + 14) ||
    (watergirl.feetX > greenPond2.x &&
      watergirl.feetX < greenPond2.x + greenPond2.w &&
      watergirl.feetY > greenPond2.y &&
      watergirl.feetY < greenPond2.y + 14)
  ) {
    fireboy.resetPosition();
    watergirl.resetPosition();
  }
  if (
    (fireboy.feetX > greenPond1.x &&
      fireboy.feetX < greenPond1.x + greenPond1.w &&
      fireboy.feetY > greenPond1.y &&
      fireboy.feetY < greenPond1.y + 14) ||
    (fireboy.feetX > greenPond2.x &&
      fireboy.feetX < greenPond2.x + greenPond2.w &&
      fireboy.feetY > greenPond2.y &&
      fireboy.feetY < greenPond2.y + 14)
  ) {
    fireboy.resetPosition();
    watergirl.resetPosition();
  }
}
