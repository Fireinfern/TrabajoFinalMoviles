function Player(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.game = game;

    this.anchor.setTo(0.5);
    
    this.data.alive = true;
    
    // Animations
    this.animations.add('idle', [0,1,2,3, 0], 8, true);
    this.animations.add("run", [6,7,8,9,10,11], 8, true);
    this.animations.add("jump", [12,13,14,15,16,17], 8, true);
    this.animations.add("die", [18,19,20,21,22,23,24,25,26,27,28,29], 8, false);
    this.animations.play('idle');

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 500;
    this.body.setSize(12,14,6,10);
    
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.Movement = function(cursors){
    if(this.data.alive){
        if (cursors.up.isDown && this.body.blocked.down) {
            this.body.velocity.y = -225;
            this.animations.play("jump");
        }

        if (cursors.left.isDown) {
            this.body.velocity.x = -150;
            this.animations.play("run");
            this.scale.x = -1;
        }
        else if (cursors.right.isDown) {
            this.body.velocity.x = 150;
            this.animations.play("run");
            this.scale.x = 1;
        }
        else {
            this.body.velocity.x = 0;
            this.animations.play("idle");
        }
    }
}

Player.prototype.Die = function(){
    this.data.alive = false;
    this.body.velocity.x = 0;
    this.animations.play("die");
}