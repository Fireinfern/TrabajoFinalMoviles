window.onload = function() {
    let game = new Phaser.Game(480, 256, Phaser.AUTO);
    game.state.add("Preload", Preload);
    game.state.add("Level1", Level1);
    game.state.add("Level2", Level2);
    game.state.start("Preload")
}