let alienImage;
let invaders;
let shooterImage;
let player;
let gameOver = false;
let canvas;
let gameCompleted = false;
let allInvadersDestroyed = false;



function preload() {
  alienImage = loadImage("images/invader.png");
  shooterImage = loadImage('images/player.png');
}

let isGameOverVisible = true;
let blinkInterval;


function setup() {

  let canvasSize = document.getElementById('sketch-id')
  canvas = createCanvas(800,400);
  canvas.style('display', 'block');
  canvas.parent('sketch-id');
  invaders = new Invaders(alienImage, 4);
  player = new Player(shooterImage);
  blinkInterval = setInterval(blinkGameOverText, 500); 
  
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
  if (isGameOver) {
    // Check if the click is within the "Continue" button
    let continueX = width / 2;
    let continueY = height / 2 + 100;
    if (
      mouseX > continueX - 120 &&
      mouseX < continueX + 120 &&
      mouseY > continueY - 20 &&
      mouseY < continueY + 20
    ) {
      resetGame();
      isGameOver = false; // Reset the game over flag
    }
  }
}

function connectToStart() {
  background(0);
  fill(255);
  textSize(25);
  textAlign(CENTER);
  textFont("Arial");
  textStyle();
  let startText = "👾Welcome to Space Invaders!👾\nClick 'Connect Passport' to start the game.";
  
  // Smooth sine wave animation
  let yOffset = height / 2 + 50 * sin(frameCount * 0.03);

  fill(255);
  text(startText, width / 2, yOffset);
}



function draw() {
  if (window?.userProfile?.email) {
    // Game is in progress
    document.getElementById('btn-passport').hidden = true;
    document.getElementById('btn-logout').hidden = false;
    
    background(0);
    
    player.update();
    player.draw();
    player.drawInfo();
    
    invaders.update(player);
    invaders.draw();
    
    // Check if all invaders are destroyed
    if (player.lives === 0) {
      showGameOver();
    } else if (allInvadersDestroyed) {
      showCongratulations();
    }
  }
   else {
    // Show start screen
    connectToStart();
    document.getElementById('btn-passport').hidden = false;
    document.getElementById('btn-logout').hidden = true;
  }
}



function showCongratulations() {
  background(0);
  fill(255);
  textFont("Arial");
  textSize(48);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  let titleX = width / 2;
  let titleY = height / 2 - 60;
  fill(0, 255, 0); // Green color for the message
  text("CONGRATULATIONS!", titleX, titleY);
  textSize(24);
  let scoreText = "Your Score: " + player.score;
  let scoreX = width / 2;
  let scoreY = titleY + 40;
  fill(255, 255, 0);
  text(scoreText, scoreX, scoreY);
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
  player.lives = 3;
  gameOver = false;
}
