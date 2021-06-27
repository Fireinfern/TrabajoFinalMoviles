Level1 = function (game) { }

Level1.prototype = {
    create() {
        BackgroundCreation(this, 'sky', 'hills1');

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        CreateTilemap(this, 'level0');

        this.enemies = this.game.add.group();
        this.createEnemies();

        let _player = new Player(this.game, 100, 100);
        this.player = this.game.add.existing(_player);

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        this.cursors = this.game.input.keyboard.createCursorKeys();

    },
    update() {
        this.game.physics.arcade.collide(this.player, this.PlatformLayer);
        this.game.physics.arcade.collide(this.player, this.DamageLayer, (player, layer) => {
            if (this.player.data.alive) {
                player.Die();
                this.dieText();
            }
        });
        this.game.physics.arcade.collide(this.enemies, this.PlatformLayer);
        this.game.physics.arcade.collide(this.enemies, this.player, (player, enemy) => {
            if (this.player.data.alive) {
                player.Die();
                this.dieText();
            }
        });

        this.player.Movement(this.cursors);
    },
    render() {
        //this.game.debug.bodyInfo(this.player,32,32);

        //this.game.debug.body(this.player);
    },
    dieText() {
        this.YouDiedText = this.game.add.text(0, 0, "You died!")
        this.YouDiedText.font = 'Press Start 2P';
        this.YouDiedText.anchor.setTo(0.5);
        this.YouDiedText.x = this.game.camera.centerX;
        this.YouDiedText.y = this.game.camera.centerY;
        this.YouDiedText.inputEnabled = true;

        this.TryAgainText = this.game.add.text(0, 0, "tap to try again")
        this.TryAgainText.font = 'Press Start 2P';
        this.TryAgainText.anchor.setTo(0.5);
        this.TryAgainText.x = this.game.camera.centerX;
        this.TryAgainText.y = this.game.camera.centerY + 40;
        this.TryAgainText.fontSize = 14;
        this.TryAgainText.inputEnabled = true;

        this.YouDiedText.events.onInputDown.add(this.resetLevel, this);
        this.TryAgainText.events.onInputDown.add(this.resetLevel, this);
    },
    resetLevel() {
        this.game.state.start("Level1", true, false);
    },
    createEnemies() {
        this.map.objects.Objects.forEach((enemy) => {
            if (enemy.name == "Enemy") {
                let newEnemy = new Enemy(this.game, enemy.x, enemy.y);
                this.enemies.add(newEnemy);
            }
        }, this);

    }
}