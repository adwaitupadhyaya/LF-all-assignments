import { Obstacle } from "../classes/obstacles";
import { OBSTACLE_TYPES } from "../constants/obstacleTypes";
import { playerDrawSize } from "../constants/constants";
import { Character } from "../classes/character";
export const pulleyPlatformDetect = (
  obstacleArray: Array<Obstacle>,
  player: Character
) => {
  let upperPlatformY = Infinity;
  obstacleArray.forEach((element) => {
    switch (element.id) {
      case OBSTACLE_TYPES.floor:
        if (
          player.feetY <= element.y &&
          player.feetX > element.x &&
          player.feetX < element.x + element.w
        ) {
          if (element.y < upperPlatformY) {
            upperPlatformY = element.y;
            player.onPlatform = true;
            player.ground = upperPlatformY - playerDrawSize;
          }
        } else {
          player.onPlatform = false;
        }
        break;
    }
  });
};
