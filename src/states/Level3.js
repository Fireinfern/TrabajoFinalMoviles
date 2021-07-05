Level3 = function (game) { }

Level3.prototype = {
    create() {
        BackgroundCreation(this, 'sky', 'hills1');

        this.playerName = "";
        this.database = firebase.database();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        CreateTilemap(this, 'level2');

        this.enemies = this.game.add.group();
        CreateEnemies(this);
        CreatePlayer(this);

        let _Finish = this.map.objects.Objects.filter(({ name }) => { return name == "Finish" })[0];
        this.Finish = this.game.add.sprite(_Finish.x, _Finish.y, 'Finish');
        this.Finish.alpha = 0;
        this.game.physics.arcade.enable(this.Finish);

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        this.game.camera.fadeIn();

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.emitter = this.game.add.emitter(this.game.camera.centerX, this.game.camera.centerY, 200);
        this.emitter.makeParticles(['pixel_blue', 'pixel_red', 'pixel_green', 'pixel_white', 'pixel_yellow']);
        this.particlesOnce = true;
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
            if (this.particlesOnce) {
                this.particlesOnce = false;
                this.emitter.x = this.game.camera.centerX;
                this.emitter.y = this.game.camera.centerY
                this.emitter.start(false, 5000, 20);
                this.player.alpha = 0;
                this.player.Die();
                this.winText();
                this.captureKeys();
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
    winText() {
        this.YouWinText = this.game.add.text(0, 0, "You Won!");
        this.YouWinText.font = 'Press Start 2P';
        this.YouWinText.anchor.setTo(0.5);
        this.YouWinText.x = this.game.camera.centerX;
        this.YouWinText.y = this.game.camera.centerY;
        this.YouWinText.inputEnabled = true;

        this.playerNameText = this.game.add.text(0, 0, this.playerName);
        this.playerNameText.font = 'Press Start 2P';
        this.playerNameText.anchor.setTo(0.5);
        this.playerNameText.x = this.game.camera.centerX;
        this.playerNameText.y = this.game.camera.centerY + 40;
        this.playerNameText.inputEnabled = true;

        this.MenuText = this.game.add.text(0, 0, "tap to go to Main Menu");
        this.MenuText.font = 'Press Start 2P';
        this.MenuText.anchor.setTo(0.5);
        this.MenuText.x = this.game.camera.centerX;
        this.MenuText.y = this.game.camera.centerY + 80;
        this.MenuText.fontSize = 14;
        this.MenuText.inputEnabled = true;

        //this.YouWinText.events.onInputDown.add(this.mainMenu, this);
        this.MenuText.events.onInputDown.add(this.mainMenu, this);
    },
    resetLevel() {
        this.game.state.start("Level3", true, false);
    },
    mainMenu() {
        if(this.playerName.length < 4){
            this.game.camera.flash(0xff0000, 500);
            return;
        }
        let date = Date.now();
        this.database.ref("/trabajofinal/" + date.toString()).set({
            date: date,
            name: this.playerName
        })
        this.game.state.start("Menu");
    },
    captureKeys() {
        this.game.input.keyboard.addCallbacks(this, null, null, (char) => {
            if (this.playerName.length < 4) {
                this.playerName += char;
                this.playerNameText.text = this.playerName;
            }
            console.log(this.playerName);
        })
    }
}