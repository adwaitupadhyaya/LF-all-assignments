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
import { getRandomInt } from "./utils";

// images
import carImage from "././assets/player-car.png";
import enemyCarImage from "./assets/enemy-car.png";

const displayScore = document.querySelector(".score") as HTMLElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

const playerCar = new Car(
  carImage,
  DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.CAR_WIDTH / 2,
  DIMENSIONS.CANVAS_HEIGHT - CAR_DIMENSIONS.CAR_HEIGHT,
  CAR_DIMENSIONS.CAR_WIDTH,
  CAR_DIMENSIONS.CAR_HEIGHT
);

let requestID: number;
let score: number = 0;

const enemyCar1 = new Car(
  enemyCarImage,
  DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.CAR_WIDTH / 2,
  getRandomInt(-600, 0),
  CAR_DIMENSIONS.CAR_HEIGHT,
  CAR_DIMENSIONS.CAR_WIDTH
);

const enemyCar2 = new Car(
  enemyCarImage,
  DIMENSIONS.CANVAS_WIDTH / 2 -
    CAR_DIMENSIONS.CAR_WIDTH / 2 -
    DIMENSIONS.CANVAS_HEIGHT / 3,
  getRandomInt(-600, 0),
  CAR_DIMENSIONS.CAR_HEIGHT,
  CAR_DIMENSIONS.CAR_WIDTH
);

const enemyCar3 = new Car(
  enemyCarImage,
  DIMENSIONS.CANVAS_WIDTH / 2 -
    CAR_DIMENSIONS.CAR_WIDTH / 2 +
    DIMENSIONS.CANVAS_HEIGHT / 3,
  getRandomInt(-600, 0),
  CAR_DIMENSIONS.CAR_HEIGHT,
  CAR_DIMENSIONS.CAR_WIDTH
);

const carArray = [enemyCar1, enemyCar2, enemyCar3];

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

const laneArray = [
  laneElement1,
  laneElement2,
  laneElement3,
  laneElement4,
  laneElement5,
  laneElement6,
];

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  ctx.fillStyle = "#343434";
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  carArray.forEach((car) => {
    ctx.drawImage(car.image, car.x, car.y, car.w, car.h);
    car.y++;
    if (car.y > DIMENSIONS.CANVAS_HEIGHT) {
      score++;
      displayScore.innerText = `Score: ${score}`;
      console.log(score);
      car.y = getRandomInt(-600, 0);
    }
  });

  ctx.drawImage(
    playerCar.image,
    playerCar.x,
    playerCar.y,
    playerCar.w,
    playerCar.h
  );

  if (playerCar.detectCollision(carArray)) {
    console.log("colided");
    score = 0;
    displayScore.innerText = `Score: ${score}`;
    cancelAnimationFrame(requestID);
    return;
  }

  laneArray.forEach((lane) => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(lane.x, lane.y, lane.w, lane.h);
    lane.y += 2;

    if (lane.y > DIMENSIONS.CANVAS_HEIGHT) {
      lane.y = -20;
    }
  });

  requestID = requestAnimationFrame(draw);
}

draw();
window.addEventListener("keypress", (event) => {
  switch (event.key) {
    case "a": {
      if (
        playerCar.x >
        DIMENSIONS.CANVAS_WIDTH / 2 -
          CAR_DIMENSIONS.CAR_WIDTH / 2 -
          DIMENSIONS.CANVAS_HEIGHT / 3
      ) {
        playerCar.x -= 200;
      }
      break;
    }

    case "d": {
      if (
        playerCar.x <
        DIMENSIONS.CANVAS_WIDTH / 2 -
          CAR_DIMENSIONS.CAR_WIDTH / 2 +
          DIMENSIONS.CANVAS_HEIGHT / 3
      ) {
        playerCar.x += 200;
      }

      break;
    }
  }
});
