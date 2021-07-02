function Enemy(game, x, y, tilemap) {
    Phaser.Sprite.call(this, game, x, y, 'enemie');
    this.game = game;
    this.tilemap = tilemap;

    this.anchor.setTo(0.5);

    // Animations
    this.animations.add('idle', [0, 1, 2, 3, 0], 8, true);
    this.animations.add("run", [6, 7, 8, 9, 10, 11], 8, true);
    this.animations.add("jump", [12, 13, 14, 15, 16, 17], 8, true);
    this.animations.add("die", [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 8, false);
    this.animations.play('idle');

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 500;
    this.body.setSize(12, 14, 6, 10);
    this.body.velocity.x = 50;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    let direction;
    if (this.body.velocity.x > 0) {
        this.scale.setTo(1, 1);
        direction = 1;
    }
    else {
        this.scale.setTo(-1, 1);
        direction = -1;
    }

    let nextX = this.x + direction * (Math.abs(this.width) / 2 + 1);
    let nextY = this.bottom + 1;

    let nextTile = this.tilemap.getTileWorldXY(nextX, nextY, this.tilemap.tileWidth, this.tilemap.tileHeight, 'Platforms');
    if (!nextTile && this.body.blocked.down) {
        this.body.velocity.x *= -1;
    }
}