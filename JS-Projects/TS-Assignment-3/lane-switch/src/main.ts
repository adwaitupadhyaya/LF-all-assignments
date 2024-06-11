import "./reset.css";
import "./style.css";
// constants
import { DIMENSIONS } from "./constants";

// classes
import { Car } from "./Classes/Image";
import { Lane } from "./Classes/Lane";

// dimensions
import { CAR_DIMENSIONS } from "./constants";
import { LANE_DIMENSIONS } from "./constants";

// utils
import { getRandomInt, isSpacedApart } from "./utils";

// images
import carImage from "././assets/player-car.png";
import enemyCarImage from "./assets/enemy-car.png";

const displayScore = document.querySelector(".score") as HTMLElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const gameOver = document.querySelector(".game__over") as HTMLElement;
const restartButton = document.querySelector(
  ".game__over--button"
) as HTMLButtonElement;

const displayHighScore = document.querySelector(".high-score") as HTMLElement;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

let playerCar: Car;
let enemyCar1: Car, enemyCar2: Car, enemyCar3: Car;
let carArray: Car[];
let laneArray: Lane[];
let requestID: number;
let score: number;
let targetX: number;
let highScore: number = 0;

const highScoreString = localStorage.getItem("highScore");
highScore = highScoreString !== null ? parseInt(highScoreString, 10) : 0;

console.log(highScore);

function initializeGame() {
  playerCar = new Car(
    carImage,
    DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.CAR_WIDTH / 2,
    DIMENSIONS.CANVAS_HEIGHT - CAR_DIMENSIONS.CAR_HEIGHT,
    CAR_DIMENSIONS.CAR_WIDTH,
    CAR_DIMENSIONS.CAR_HEIGHT
  );
  targetX = playerCar.x;
  CAR_DIMENSIONS.CAR_SPEED = 2;

  const carSpacing = CAR_DIMENSIONS.CAR_HEIGHT * 2;

  do {
    enemyCar1 = new Car(
      enemyCarImage,
      DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.CAR_WIDTH / 2,
      getRandomInt(-600, 0),
      CAR_DIMENSIONS.CAR_HEIGHT,
      CAR_DIMENSIONS.CAR_WIDTH
    );

    enemyCar2 = new Car(
      enemyCarImage,
      DIMENSIONS.CANVAS_WIDTH / 2 -
        CAR_DIMENSIONS.CAR_WIDTH / 2 -
        DIMENSIONS.CANVAS_HEIGHT / 3,
      getRandomInt(-600, 0),
      CAR_DIMENSIONS.CAR_HEIGHT,
      CAR_DIMENSIONS.CAR_WIDTH
    );

    enemyCar3 = new Car(
      enemyCarImage,
      DIMENSIONS.CANVAS_WIDTH / 2 -
        CAR_DIMENSIONS.CAR_WIDTH / 2 +
        DIMENSIONS.CANVAS_HEIGHT / 3,
      getRandomInt(-600, 0),
      CAR_DIMENSIONS.CAR_HEIGHT,
      CAR_DIMENSIONS.CAR_WIDTH
    );

    carArray = [enemyCar1, enemyCar2, enemyCar3];
  } while (!isSpacedApart(carArray, carSpacing));

  const laneElement1 = new Lane(
    (1 / 3) * DIMENSIONS.CANVAS_WIDTH,
    10,
    LANE_DIMENSIONS.LANE_WIDTH,
    LANE_DIMENSIONS.LANE_HEIGHT
  );

  const laneElement2 = new Lane(
    (2 / 3) * DIMENSIONS.CANVAS_WIDTH,
    10,
    LANE_DIMENSIONS.LANE_WIDTH,
    LANE_DIMENSIONS.LANE_HEIGHT
  );

  const laneElement3 = new Lane(
    (1 / 3) * DIMENSIONS.CANVAS_WIDTH,
    200,
    LANE_DIMENSIONS.LANE_WIDTH,
    LANE_DIMENSIONS.LANE_HEIGHT
  );

  const laneElement4 = new Lane(
    (2 / 3) * DIMENSIONS.CANVAS_WIDTH,
    200,
    LANE_DIMENSIONS.LANE_WIDTH,
    LANE_DIMENSIONS.LANE_HEIGHT
  );

  const laneElement5 = new Lane(
    (1 / 3) * DIMENSIONS.CANVAS_WIDTH,
    400,
    LANE_DIMENSIONS.LANE_WIDTH,
    LANE_DIMENSIONS.LANE_HEIGHT
  );

  const laneElement6 = new Lane(
    (2 / 3) * DIMENSIONS.CANVAS_WIDTH,
    400,
    LANE_DIMENSIONS.LANE_WIDTH,
    LANE_DIMENSIONS.LANE_HEIGHT
  );

  laneArray = [
    laneElement1,
    laneElement2,
    laneElement3,
    laneElement4,
    laneElement5,
    laneElement6,
  ];

  score = 0;
  displayScore.innerText = `Score: ${score}`;
  gameOver.style.display = "none";
}

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  CAR_DIMENSIONS.CAR_SPEED *= 1.001;

  ctx.fillStyle = "#343434";
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  carArray.forEach((car) => {
    ctx.drawImage(car.image, car.x, car.y, car.w, car.h);

    car.y += CAR_DIMENSIONS.CAR_SPEED;
    if (car.y > DIMENSIONS.CANVAS_HEIGHT) {
      score++;
      if (score > highScore) {
        highScore = score;
        displayHighScore.innerText = `High Score: ${highScore}`;
        localStorage.setItem("highScore", JSON.stringify(highScore));
      }
      displayScore.innerText = `Score: ${score}`;
      const carSpacing = CAR_DIMENSIONS.CAR_HEIGHT * 2;
      do {
        car.y = getRandomInt(-600, 0);
      } while (!isSpacedApart(carArray, carSpacing));
    }
  });

  if (playerCar.x < targetX) {
    playerCar.x += 10;
    if (playerCar.x > targetX) {
      playerCar.x = targetX;
    }
  } else if (playerCar.x > targetX) {
    playerCar.x -= 10;
    if (playerCar.x < targetX) {
      playerCar.x = targetX;
    }
  }

  ctx.drawImage(
    playerCar.image,
    playerCar.x,
    playerCar.y,
    playerCar.w,
    playerCar.h
  );

  if (playerCar.detectCollision(carArray)) {
    displayScore.innerText = `Score: ${score}`;
    gameOver.style.display = "flex";
    gameOver.style.justifyContent = "center";
    gameOver.style.alignItems = "center";
    gameOver.style.flexDirection = "column";
    gameOver.style.gap = "20px";

    cancelAnimationFrame(requestID);

    return;
  }

  laneArray.forEach((lane) => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(lane.x, lane.y, lane.w, lane.h);
    lane.y += 2;

    if (lane.y > DIMENSIONS.CANVAS_HEIGHT) {
      lane.y = -lane.h;
    }
  });

  requestID = requestAnimationFrame(draw);
}

restartButton.addEventListener("click", () => {
  initializeGame();
  requestAnimationFrame(draw);
});

initializeGame();
draw();

window.addEventListener("keypress", (event) => {
  switch (event.key) {
    case "a": {
      if (
        targetX >
        DIMENSIONS.CANVAS_WIDTH / 2 -
          CAR_DIMENSIONS.CAR_WIDTH / 2 -
          DIMENSIONS.CANVAS_WIDTH / 3
      ) {
        targetX -= 200;
      }
      break;
    }

    case "d": {
      if (
        targetX <
        DIMENSIONS.CANVAS_WIDTH / 2 -
          CAR_DIMENSIONS.CAR_WIDTH / 2 +
          DIMENSIONS.CANVAS_WIDTH / 3
      ) {
        targetX += 200;
      }

      break;
    }
  }
});
