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
        this.maxBullets = 3;
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
        text("LIVES", t_width+390, 25);
        for (let i = 0; i < this.lives; i++) {
            const x = t_width +450 + i * 40; 
            image(this.image, x, 10, this.r * 2, this.r * 2);
        }
    }
    drawInfo() {
        fill(255)
        let player = window?.userProfile?.email + ": ";
        let player_ = textWidth(player);
        let score = text(player, 50, 25);
        push();
        fill(100, 255, 100);
        text(this.score, player_ + 50, 25);
        pop();
        this.drawLives(player_ + textWidth(this.score) + 100)
    }
    
    
    moveLeft() {
        this.isMovingRight = false;
        this.isMovingLeft = true;
    }
    moveRight() {
        this.isMovingLeft = false;
        this.isMovingRight = true;
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