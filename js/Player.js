class Player {
    constructor(shooterImage) {
        this.image = shooterImage;
        this.x = width / 2;
        this.y = height -30;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.bullets = [];
        this.lives = 3;
        this.r = 12;
        this.maxBullets = 4;
        this.score = 0; 
        
    }

    update() {
        if (this.isMovingRight) {
            this.x += 1;
        } else if (this.isMovingLeft) {
            this.x -= 1;
        }
        this.updateBullets();
    }

    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update();
            if (this.hasHitAlien(this.bullets[i])) {
                this.bullets.splice(i, 1);
                this.score += 10;
                break;
            } else if (this.bullets[i].isOffScreen()) {
                this.bullets.splice(i, 1);
                break;
            }
        }
    }
    
    hasHitAlien(bullet) {
        return invaders.checkCollision(bullet.x, bullet.y);
    }

    draw() {
        image(this.image, this.x, this.y, this.r * 2, this.r*2);
        this.drawBullets();
        
    }

    drawBullets() {
        for (let bullet of this.bullets) {
            bullet.draw();
        }
    }

    drawLives(t_width) {
        fill(255);
        textSize(15);
        text("LIVES", t_width + 350, 25);
        const spacing = 30;
        for (let i = 0; i < this.lives; i++) {
            const x = t_width + 400 + i * spacing;
            image(this.image, x, 10, this.r * 1.5, this.r * 1.5);
        }
    }

     userElement = document.getElementById('user');
    
     drawInfo() {
        fill(255);
        let player = window?.userProfile?.email + "";
        
        let playerWidth = textWidth(player);
        let playerX = (width - playerWidth) / 2; // Center the email text horizontally
        
        // Calculate the maximum width for the email text
        let maxEmailWidth = width - 150;
        if (playerWidth > maxEmailWidth) {
            player = player.substring(0, Math.floor(maxEmailWidth / textWidth("A"))); // Truncate if too long
        }
    
        // Update the user element in the HTML to display the email
        const userElement = document.getElementById('user');
        userElement.innerText = "Player: " + player;
        
        fill(100, 255, 100);
        this.scoreText = "Score: " + this.score;
        let scoreX = 50;
        let scoreY = 25; // Adjusted the 'y' position to add more space below the score
        text(this.scoreText, scoreX, scoreY);
    
        let totalWidth = playerWidth + textWidth(this.scoreText) + 100;
        this.drawLives(totalWidth);
    }
    

    
    moveLeft() {
        if (this.x - 1 > this.r) { // Check if the player won't move out of the left screen edge
            this.isMovingRight = false;
            this.isMovingLeft = true;
        }
    }
    moveRight() {
        if (this.x + 1 < width - this.r) { // Check if the player won't move out of the right screen edge
            this.isMovingLeft = false;
            this.isMovingRight = true;
        }
    }
    shootUp(){
        return this.y > invaders.aliens[0].y;
    }

    shoot() {
        if (this.bullets.length < this.maxBullets){
            this.bullets.push(new PlayerBullet(this.x + 12, this.y, this.shootUp()));
        }    
    }
    
    respawn() {
        this.x = width / 2;
        this.y = height -30;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.lives -= 1;
    }
    
    shootUp(){
        return this.y > invaders.aliens[0].y;
    }
    
    loseLive(){
        if(this.lives > 0){
            this.respawn();
            
        }
    }
}