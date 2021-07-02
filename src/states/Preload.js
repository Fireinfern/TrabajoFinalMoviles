Preload = function(game) {}

Preload.prototype = {
    preload() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.game.load.tilemap("level0", "./assets/tilesets/tiled/Level_0.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap("level1", "./assets/tilesets/tiled/Level_1.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', "./assets/tilesets/forest-tileset.png",16,16);
        this.game.load.image('hills1', './assets/background/background-hills1.png');
        this.game.load.image('sky', './assets/background/background-sky.png');
        this.game.load.spritesheet('player', "./assets/characters/Character_2.png", 24,24,30);
        this.game.load.spritesheet('enemie', "./assets/characters/Character_3.png", 24,24,30);
    },
    create() {
        this.game.state.start("Level2", true, false);
    }
}