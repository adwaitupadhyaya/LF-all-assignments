import { Obstacle } from "../classes/obstacles";
import { OBSTACLE_TYPES } from "../constants/obstacleTypes";
import { playerDrawSize } from "../constants/constants";
import { Character } from "../classes/character";

/**
 * The function buttonPlatformDetect checks if the player is on a platform based on their position
 * relative to obstacles in the obstacleArray.
 * @param obstacleArray - An array containing obstacles in the game, each obstacle having properties
 * like id, x, y, and w.
 * @param {Character} player - The `player` parameter in the `buttonPlatformDetect` function represents
 * the character in the game. It likely contains information such as the character's position (x, y),
 * size, and status (e.g., on a platform or not). This parameter is used to determine if the character
 * is on
 */
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
