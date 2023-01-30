class face {
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height})
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "faceHappy.png")
    }

    update() {
        if(gameover) {
            this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "faceDead.png")
        } else if(win) {
            this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "faceSunGlasses.png")
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}