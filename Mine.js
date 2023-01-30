class Mine {
    constructor() {
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileMine.png")
    }

    clicked() {
        
    }

    explode() {
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileExploded.png")
        gameover = true;
        running = false;
    }
}