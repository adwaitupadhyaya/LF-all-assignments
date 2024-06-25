import { Fireboy } from "../classes/fireboy";
import { Pond } from "../classes/Ponds";
import { Pulley } from "../classes/pulley";
import { Watergirl } from "../classes/watergirl";
export function pondCollisionLevel3(
  fireboy: Fireboy,
  watergirl: Watergirl,
  bluePond1: Pond,
  bluePond2: Pond,
  bluePond3: Pond,
  redPond1: Pond,
  redPond2: Pond,
  redPond3: Pond,
  pulley: Pulley
) {
  if (
    (fireboy.feetX > bluePond1.x &&
      fireboy.feetX < bluePond1.x + bluePond1.w &&
      fireboy.feetY > bluePond1.y - 10 &&
      fireboy.feetY < bluePond1.y + bluePond1.h) ||
    (fireboy.feetX > bluePond2.x &&
      fireboy.feetX < bluePond2.x + bluePond2.w &&
      fireboy.feetY > bluePond2.y &&
      fireboy.feetY < bluePond2.y + bluePond2.h) ||
    (fireboy.feetX > bluePond3.x &&
      fireboy.feetX < bluePond3.x + bluePond3.w &&
      fireboy.feetY > bluePond3.y &&
      fireboy.feetY < bluePond3.y + bluePond3.h)
  ) {
    fireboy.resetForLevel3();
    watergirl.resetForLevel3();
    pulley.resetPosition();
  }

  if (
    (watergirl.feetX > redPond1.x &&
      watergirl.feetX < redPond1.x + redPond1.w &&
      watergirl.feetY > redPond1.y &&
      watergirl.feetY < redPond1.y + redPond1.h) ||
    (watergirl.feetX > redPond2.x &&
      watergirl.feetX < redPond2.x + redPond2.w &&
      watergirl.feetY > redPond2.y - 10 &&
      watergirl.feetY < redPond2.y + redPond2.h) ||
    (watergirl.feetX > redPond3.x &&
      watergirl.feetX < redPond3.x + redPond3.w &&
      watergirl.feetY > redPond3.y &&
      watergirl.feetY < redPond3.y + redPond3.h)
  ) {
    fireboy.resetForLevel3();
    watergirl.resetForLevel3();
    pulley.resetPosition();
  }
}
