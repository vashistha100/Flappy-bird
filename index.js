//board
let board;
let boardWidht = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; // widht/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidht / 8;
let birdY = boardHeight / 2;
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
});


function update() {
  requestAnimationFrame(update);

  context.clear.Rect(0, 0, board.width, board.height);

  //bird
  context.drawImage(birdImg, bird.x, bird.y, birdWidth, birdHeight);

  //pipes
  
}


function placePipe() {
  let topPipe={
   ing: topPipeimg 
  }
}