import { Obstacle } from "../classes/obstacles";
import { OBSTACLE_TYPES } from "../constants/obstacleTypes";
import { playerDrawSize } from "../constants/constants";
import { Character } from "../classes/character";

/**
 * The function `pulleyPlatformDetect` checks if the player is on a platform based on their position
 * relative to obstacles in the game.
 * @param obstacleArray - An array containing objects representing different obstacles in the game,
 * such as floors, walls, or platforms. Each object has properties like id, x, y, and w (width).
 * @param {Character} player - The `player` parameter in the `pulleyPlatformDetect` function represents
 * the character or player object in the game. It contains information about the player's position,
 * such as `feetX` and `feetY` coordinates, as well as properties like `onPlatform` and `
 */
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
