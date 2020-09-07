const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit

const box = 32;

let level = 150;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const gameOverImg = new Image();
gameOverImg.src = "img/GameOver.png";

// load audio files

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

// create the food

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

const gameOver = {
  x: 4 * box,
  y: 4 * box,
};

// create the score

let score = 0;

// DETECT SWIPE FOR MOBILE!!.................................................

/// usage

detectSwipe("swipeme", (el, dir) => {
  // alert(`you swiped on element with id ${el.id} to ${dir} direction`)
  // console.log(dir);
  let key = dir;
  if (key == "left" && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (key == "up" && d != "DOWN") {
    up.play();
    d = "UP";
  } else if (key == "right" && d != "LEFT") {
    right.play();
    d = "RIGHT";
  } else if (key == "down" && d != "UP") {
    down.play();
    d = "DOWN";
  }
  gameStarted();
});

// source code

// Tune deltaMin according to your needs. Near 0 it will almost
// always trigger, with a big value it can never trigger.
function detectSwipe(id, func, deltaMin = 90) {
  const swipe_det = {
    sX: 0,
    sY: 0,
    eX: 0,
    eY: 0,
  };
  // Directions enumeration
  const directions = Object.freeze({
    UP: "down",
    DOWN: "up",
    RIGHT: "right",
    LEFT: "left",
  });
  let direction = null;
  const el = document.getElementById(id);
  el.addEventListener(
    "touchstart",
    function (e) {
      const t = e.touches[0];
      swipe_det.sX = t.screenX;
      swipe_det.sY = t.screenY;
    },
    false
  );
  el.addEventListener(
    "touchmove",
    function (e) {
      // Prevent default will stop user from scrolling, use with care
      e.preventDefault();
      const t = e.touches[0];
      swipe_det.eX = t.screenX;
      swipe_det.eY = t.screenY;
    },
    false
  );
  el.addEventListener(
    "touchend",
    function (e) {
      const deltaX = swipe_det.eX - swipe_det.sX;
      const deltaY = swipe_det.eY - swipe_det.sY;
      // Min swipe distance, you could use absolute value rather
      // than square. It just felt better for personnal use
      if (deltaX ** 2 + deltaY ** 2 < deltaMin ** 2) return;
      // horizontal
      if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1)
        direction = deltaX > 0 ? directions.RIGHT : directions.LEFT;
      // vertical
      else direction = deltaY > 0 ? directions.UP : directions.DOWN;

      if (direction && typeof func === "function") func(el, direction);

      direction = null;
    },
    false
  );
}
// END OF DETECT SWIPE FOR MOBILE.....................

// control the snake

let d;

document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    up.play();
    d = "UP";
  } else if (key == 39 && d != "LEFT") {
    right.play();
    d = "RIGHT";
  } else if (key == 40 && d != "UP") {
    down.play();
    d = "DOWN";
  }
}

// check collision function

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// draw everything to Canvas

function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
    // we do not remove the tail
  } else {
    //   remove the tale
    snake.pop();
  }

  // add new snake Head
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //   game over rules
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
    ctx.drawImage(gameOverImg, gameOver.x, gameOver.y);

    setTimeout(startAgain, 1000);
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(
    `level ${level == 150 ? "easy" : "medium"}`,
    11 * box,
    1.6 * box
  );

  if (score > 5) {
    level = 125;
  } else if (score > 10) {
    level = 150;
  } else if (score > 20) {
    level = 165;
  }
}

// call draw function every 100ms by setInterval
let game = setInterval(draw, level);

//changing first sweep screen
const gameStarted = () => {
  const swipeToStart = document.querySelector(".swipeToStart");
  swipeToStart.style.display = "none";
};

const startAgain = () => {
  const playAgain = document.querySelector(".playAgain");
  const swipemeOff = document.querySelector(".swipeme");
  playAgain.style.display = "block";
  swipemeOff.style.display = "none";
  playAgain.addEventListener("touchstart", (e) => {
    e.preventDefault();
    console.log("touched");
    // window.location.reload();
  });
};
