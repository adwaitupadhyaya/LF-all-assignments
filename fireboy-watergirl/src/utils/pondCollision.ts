import { Fireboy } from "../classes/fireboy";
import { Lever } from "../classes/lever";
import { Pond } from "../classes/Ponds";
import { Watergirl } from "../classes/watergirl";
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
