class face {
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height})
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "faceHappy.png")
    }

    update() {
        if(this.clicked()) {
            this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "faceHappy.png")
            this.game.camera.reload();
            this.game.timer.gameTime = 0;
        }
        if(gameover) {
            this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "faceDead.png")
        } else if(win) {
            this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "faceSunGlasses.png")
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    clicked() {
        return this.game.leftClick && this.game.mouse.x >= this.x && this.game.mouse.x <= this.x + this.width && this.game.mouse.y >= this.y && this.game.mouse.y <= this.y + this.height
    }
}