// main.ts

import {
  DIMENSIONS,
  PLATFORM_DIMENSIONS,
  PLAYER_DIMENSIONS,
} from "./constants";
import "./style.css";
import bg from "./assets/background.png";
import playerImage from "./assets/player.png";
import platformImage from "./assets/platform.png";
import gameOverSound from "./assets/gameOverSound.wav";
import Player from "./Classes/Player";
import Platform from "./Classes/Platform";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

const background = new Image();
background.src = bg;
let isPaused = false;

const INITIAL_X =
  DIMENSIONS.CANVAS_WIDTH / 2 - PLAYER_DIMENSIONS.PLAYER_WIDTH / 2;
const INITIAL_Y =
  DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER_DIMENSIONS.PLAYER_HEIGHT / 2;

const player = new Player(
  INITIAL_X,
  INITIAL_Y,
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT,
  playerImage
);

const platforms: Platform[] = [];
const platformCount = 7;

platforms.push(
  new Platform(
    DIMENSIONS.CANVAS_WIDTH / 2 - PLATFORM_DIMENSIONS.PLATFORM_WIDTH / 2,
    player.y + player.h + 10,
    PLATFORM_DIMENSIONS.PLATFORM_WIDTH,
    PLATFORM_DIMENSIONS.PLATFORM_HEIGHT,
    platformImage,
    PLATFORM_DIMENSIONS.PLATFORM_SPEED
  )
);

for (let i = 0; i < platformCount - 1; i++) {
  platforms.push(
    Platform.generatePlatform(
      platforms,
      PLATFORM_DIMENSIONS.PLATFORM_WIDTH,
      platformImage
    )
  );
}

let gravity = 0.2;
const initialBounceVelocity = -10;
const playerVelocityX = 4;
let maxPlayerHeight = player.y;

let isGameOver = false;
let score = 0;
let highScore = parseInt(localStorage.getItem("highScore") || "0");

const gameOverAudio = new Audio(gameOverSound);

function draw() {
  if (!isPaused) {
    ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(player.image, player.x, player.y, player.w, player.h);

    let platformWidth = PLATFORM_DIMENSIONS.PLATFORM_WIDTH;
    if (score >= 150) {
      platformWidth *= 0.8;
    } else if (score >= 100) {
      platformWidth *= 0.85;
    } else if (score >= 70) {
      platformWidth *= 0.9;
    }

    platforms.forEach((platform) => {
      platform.updatePosition();

      if (platform.y > DIMENSIONS.CANVAS_HEIGHT) {
        platform.resetPosition(
          -PLATFORM_DIMENSIONS.PLATFORM_HEIGHT,
          platformWidth
        );

        let isValidPosition = false;
        while (!isValidPosition) {
          isValidPosition = true;
          for (let otherPlatform of platforms) {
            if (
              otherPlatform !== platform &&
              Platform.isColliding(platform, otherPlatform)
            ) {
              isValidPosition = false;
              platform.resetPosition(
                -PLATFORM_DIMENSIONS.PLATFORM_HEIGHT,
                platformWidth
              );
              break;
            }
          }
        }
      }

      platform.draw(ctx);
    });

    player.applyGravity(gravity);
    player.updatePosition();

    maxPlayerHeight = Math.max(maxPlayerHeight, player.y);

    platforms.forEach((platform) => {
      if (player.handleCollisionWithPlatform(platform, initialBounceVelocity)) {
        score++;
      }
    });

    if (
      player.velocityY > 0 &&
      platforms.every((platform) => player.y + player.h < platform.y)
    ) {
      platforms.push(
        Platform.generatePlatform(platforms, platformWidth, platformImage)
      );
    }

    if (
      player.y <
      DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER_DIMENSIONS.PLAYER_HEIGHT / 2
    ) {
      player.y =
        DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER_DIMENSIONS.PLAYER_HEIGHT / 2;
      player.velocityY = 0;
    }

    if (player.y > DIMENSIONS.CANVAS_HEIGHT) {
      isGameOver = true;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore.toString());
      }

      gameOverAudio.play();

      ctx.font = "30px 'Gloria Hallelujah', cursive";
      ctx.fillStyle = "red";
      ctx.fillText(
        "Game Over",
        DIMENSIONS.CANVAS_WIDTH / 2 - 80,
        DIMENSIONS.CANVAS_HEIGHT / 2
      );
      ctx.fillText(
        `Score: ${score}`,
        DIMENSIONS.CANVAS_WIDTH / 2 - 60,
        DIMENSIONS.CANVAS_HEIGHT / 2 + 40
      );
      ctx.fillText(
        `High Score: ${highScore}`,
        DIMENSIONS.CANVAS_WIDTH / 2 - 80,
        DIMENSIONS.CANVAS_HEIGHT / 2 + 80
      );
      ctx.fillText(
        "Press 'R' to restart",
        DIMENSIONS.CANVAS_WIDTH / 2 - 120,
        DIMENSIONS.CANVAS_HEIGHT / 2 + 120
      );
    }

    ctx.font = "20px 'Gloria Hallelujah', cursive";
    ctx.fillStyle = "red";
    ctx.fillText(`Score: ${score}`, DIMENSIONS.CANVAS_WIDTH - 100, 30);
    ctx.fillText(`High Score: ${highScore}`, DIMENSIONS.CANVAS_WIDTH - 150, 60);

    player.handleScreenWrap(DIMENSIONS.CANVAS_WIDTH);
  }

  if (!isGameOver) {
    requestAnimationFrame(draw);
  }
}

draw();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a": {
      player.moveLeft(playerVelocityX);
      break;
    }
    case "d": {
      player.moveRight(playerVelocityX);
      break;
    }
    case "r": {
      if (isGameOver) {
        restartGame();
      }
      break;
    }
    case " ": {
      isPaused = !isPaused;
      break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
    case "d": {
      player.stop();
      break;
    }
  }
});

// main.ts (continued)

function restartGame() {
  player.resetPosition(INITIAL_X, INITIAL_Y);
  maxPlayerHeight = player.y;

  platforms.forEach((platform, index) => {
    if (index === 0) {
      platform.resetPosition(
        player.y + player.h + 10,
        PLATFORM_DIMENSIONS.PLATFORM_WIDTH
      );
      platform.x =
        DIMENSIONS.CANVAS_WIDTH / 2 - PLATFORM_DIMENSIONS.PLATFORM_WIDTH / 2;
    } else {
      platform.resetPosition(
        Math.random() * DIMENSIONS.CANVAS_HEIGHT,
        PLATFORM_DIMENSIONS.PLATFORM_WIDTH
      );
    }
  });

  isGameOver = false;
  score = 0;
  draw();
}
