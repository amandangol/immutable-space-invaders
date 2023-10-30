let alienImage;
let invaders;
let shooterImage;
let player;
let gameOver = false;
let canvas;

function preload() {
  alienImage = loadImage("invader.png");
  shooterImage = loadImage('player.png');
}

let isGameOverVisible = true;
let blinkInterval;

function setup() {
  canvas = createCanvas(800, 400);
  canvas.parent('sketch-holder');
  invaders = new Invaders(alienImage, 4);
  player = new Player(shooterImage);
  blinkInterval = setInterval(blinkGameOverText, 1000); // Blink every 1 second
}

function showGameOver() {
  background(0);
  gameOver = true;
  fill(255);

  // Set a custom font and text size for the title
  textFont("Arial");
  textSize(48);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  let titleX = width / 2;
  let titleY = height / 2 - 60;
  fill(255, 0, 0); // Red color for the title
  text(isGameOverVisible ? "GAME OVER" : "", titleX, titleY);

  
  textSize(24);
  let scoreText = "Your Score: " + player.score;
  let scoreX = width / 2;
  let scoreY = titleY + 40;
  fill(255, 255, 0); 
  text(scoreText, scoreX, scoreY);

 
  textSize(18);
  let continueText = "Click anywhere to continue";
  let continueX = width / 2;
  let continueY = height / 2 + 100;

  noFill();
  stroke(0, 255, 0); 
  strokeWeight(2);
  rectMode(CENTER);
  rect(continueX, continueY, 240, 40, 10); 

  noStroke();
  fill(0, 255, 0); 
  text(continueText, continueX, continueY);
}

function blinkGameOverText() {
  isGameOverVisible = !isGameOverVisible;
}

function mouseClicked() {
  if (gameOver) {
    resetGame();
  }
}

function mouseClicked() {
  if (gameOver) {
    resetGame();
  }
}

function connectToStart() {
  background(0);
  fill(255);
  textSize(16);
  let startText = "GAME will start after succesfully authenticating. Click on Connect passport"
  text(startText, width/2 - textWidth(startText)/2, height/2);
}

function draw() {
  if(window?.userProfile?.email){
    document.getElementById('btn-passport').hidden = true;
    document.getElementById('btn-logout').hidden = false;
    background(0);
    player.update();
    player.draw();
    player.drawInfo();
    invaders.update(player);
    invaders.draw();
    if (player.lives == 0) {
      showGameOver();
    }
  }
  else{
    connectToStart();
    document.getElementById('btn-passport').hidden = false;
    document.getElementById('btn-logout').hidden = true;

  }
}


function keyPressed() {
  if (gameOver) {
    resetGame();
  } else {
    switch (keyCode) {
      case RIGHT_ARROW:
      case 88:
        player.moveRight();
        break;
      case LEFT_ARROW:
      case 90:
        player.moveLeft();
        break;
      case 32:
        player.shoot();
        break;
    }
  }
}


function resetGame() {
  setup();
  player.lives = 2;
  gameOver = false;
}
