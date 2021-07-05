Level1 = function (game) { }

Level1.prototype = {
    create() {
        BackgroundCreation(this, 'sky', 'hills1');

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        CreateTilemap(this, 'level0');

        this.enemies = this.game.add.group();
        CreateEnemies(this);
        CreatePlayer(this);

        let _Finish = this.map.objects.Objects.filter(({ name }) => { return name == "Finish" })[0];
        this.Finish = this.game.add.sprite( _Finish.x, _Finish.y, 'Finish');
        this.Finish.alpha = 0;
        this.game.physics.arcade.enable(this.Finish);

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        this.game.camera.fadeIn();

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
        this.game.physics.arcade.overlap(this.player, this.Finish, () => {
            this.game.state.start("Level2");
        });

        this.player.Movement(this.cursors);
    },
    render() {
        //this.game.debug.bodyInfo(this.player,32,32);

        //this.game.debug.body(this.player);
    },
    dieText() {
        this.YouDiedText = this.game.add.text(0, 0, "Te uniste a los cazadores!")
        this.YouDiedText.font = 'Press Start 2P';
        this.YouDiedText.anchor.setTo(0.5);
        this.YouDiedText.x = this.game.camera.centerX;
        this.YouDiedText.y = this.game.camera.centerY;
        this.YouDiedText.fontSize = 14;
        this.YouDiedText.inputEnabled = true;

        this.TryAgainText = this.game.add.text(0, 0, "volver a intentar")
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
    }
}