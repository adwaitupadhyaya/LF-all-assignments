import { Obstacle } from "../classes/Obstacles";
import { OBSTACLE_TYPES } from "../constants/obstacleTypes";
import { playerDrawSize } from "../constants/constants";
import { Character } from "../classes/character";
export const buttonPlatformDetect = (
  obstacleArray: Array<Obstacle>,
  player: Character
) => {
  let upperPlatformY = Infinity;
  obstacleArray.forEach((element) => {
    switch (element.id) {
      case OBSTACLE_TYPES.floor:
        if (
          player.y + playerDrawSize <= element.y &&
          player.x > element.x &&
          player.x < element.x + element.w
        ) {
          if (element.y < upperPlatformY) {
            console.log(`${player.constructor.name} on platform`);
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
