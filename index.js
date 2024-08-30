//board
let board;
let boardWidht = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; // widht/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidht / 8;
let birdY = (boardHeight * 1) / 4;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

//pipes
let pipeArray = [];
let pipeWidth = 64; // widht/height ration is 384/3072 =1/8
let pipeHeight = 512;
let pipeX = boardWidht;
let pipeY = 0;

let topPipeimg;
let bottomPipeimg;

// physics
let velocityX = -2; //pipe moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.3; //gravity acting on bird

let gameOver = false;
let score = 0;

window.addEventListener("load", () => {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidht;
  context = board.getContext("2d"); //used for drawing on the board

  //draw flappy bird
  // context.fillStyle = "green";
  //  context.fillRect(bird.x, bird.y, bird.width, bird.height);

  //load images

  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipeimg = new Image();
  topPipeimg.src = "./toppipe.png";

  bottomPipeimg = new Image();
  bottomPipeimg.src = "./bottompipe.png";

  requestAnimationFrame(update);
  setInterval(placePipe, 1500); // 1500 is 1.5sec
  document.addEventListener("keydown", moveBird);
});

const MAX_VELOCITY = 8;

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  //bird
  velocityY += gravity;
  velocityY = Math.min(velocityY, MAX_VELOCITY);
  // bird.y += velocityY
  bird.y = Math.max(bird.y + velocityY, 0);
  context.drawImage(birdImg, bird.x, bird.y, birdWidth, birdHeight);

  if (bird.y > board.height) {
    gameOver = true;
  }

  //pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }
  //clear pipes
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  //score
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if (gameOver) {
    context.fillText("GAME OVER", 5, 90);
  }
}

function placePipe() {
  if (gameOver) {
    return;
  }
  let randomY = pipeY - pipeHeight / 4 - (Math.random() * pipeHeight) / 2;
  let openingSpace = boardHeight / 4;
  let topPipe = {
    img: topPipeimg,
    x: pipeX,
    y: randomY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeimg,
    x: pipeX,
    y: randomY + pipeHeight + openingSpace,
    height: pipeHeight,
    width: pipeWidth,
    passed: false,
  };
  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
    // jump
    velocityY = -6;
  }
  if (gameOver) {
    bird.y = birdY;
    velocityY = 0;
    pipeArray = [];
    score = 0;
    gameOver = false;
    velocityX=-2
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + b.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
