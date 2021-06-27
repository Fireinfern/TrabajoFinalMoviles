function BackgroundCreation(state, skyKey, backgroundKey) {
    state[skyKey] = state.game.add.tileSprite(0, 0, 1500, 400, skyKey);
    state[skyKey].scale.setTo(0.84);

    state[backgroundKey] = state.game.add.tileSprite(0, 0, 1500, 400, backgroundKey);
    state[backgroundKey].scale.setTo(0.84);
}

function CreateTilemap(state, levelKey) {
    state.map = state.game.add.tilemap(levelKey);
    
    state.map.addTilesetImage('Forest_tileset', 'tiles');

    state.PlatformLayer = state.map.createLayer(0);
    state.PlatformLayer.resizeWorld();
    state.NoCollisionLayer = state.map.createLayer(1);
    state.CosmeticsLayer = state.map.createLayer(2);
    state.DamageLayer = state.map.createLayer(3);

    state.game.physics.arcade.enable(state.PlatformLayer);
    state.map.setCollisionBetween(1, 1000, true, 'Platforms');
    state.map.setCollisionBetween(1, 1053, true, 'Damage');
}