import watergirlImageHeadRight from "/images/watergirl_sprite-right.png";
import fireboyImageHeadRight from "/images/fireboy_sprite-right.png";
import { CANVAS } from "../constants/canvasDimensions";
import { Fireboy } from "../classes/fireboy";
import { Watergirl } from "../classes/watergirl";
import fireboyImageHead from "/images/fireboy_sprite.png";
import watergirlImageHead from "/images/watergirl_sprite.png";
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
