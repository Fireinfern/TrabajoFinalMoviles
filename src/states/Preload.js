Preload = function(game) {}

Preload.prototype = {
    preload() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.game.load.tilemap("level0", "./assets/tilesets/tiled/Level_0.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap("level1", "./assets/tilesets/tiled/Level_1.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap("level2", "./assets/tilesets/tiled/Level_2.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', "./assets/tilesets/forest-tileset.png",16,16);
        this.game.load.image('hills1', './assets/background/background-hills1.png');
        this.game.load.image('sky', './assets/background/background-sky.png');
        this.game.load.spritesheet('player', "./assets/characters/Character_2.png", 24,24,30);
        this.game.load.spritesheet('enemie', "./assets/characters/Character_3.png", 24,24,30);
        //Particles
        this.game.load.image('pixel_blue', './assets/particles/pixel_blue.png');
        this.game.load.image('pixel_green', './assets/particles/pixel_green.png');
        this.game.load.image('pixel_red', './assets/particles/pixel_red.png');
        this.game.load.image('pixel_white', './assets/particles/pixel_white.png');
        this.game.load.image('pixel_yellow', './assets/particles/pixel_yellow.png');
    },
    create() {
        this.game.state.start("Level1", true, false);
    }
}