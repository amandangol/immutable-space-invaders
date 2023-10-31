class AlienBullet extends Bullet {
    constructor(x, y) {
        super(x, y);
        this.r = 4;
    }
    update() {
        this.y += 4;
    }
    checkCollisionWithPlayer(player) {
          if (dist(this.x, this.y, player.x, player.y) < this.r + player.r) {
            return true;
        }
        return false
      }
}