class Mine {
    constructor() {
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileMine.png")
    }

    clicked() {
        this.explode()
    }

    explode() {
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileExploded.png")
    }
}