class Mine {
    constructor(game) {
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileMine.png")
        this.game = game
        this.animX = 1
        this.animY = 1
        this.animXBuffer = 10
        this.animYBuffer = 10
        this.animWidth = 185
        this.animHeight = 185
        this.animScale = 0.25
        this.animRowCount = 0;
        this.animRows = 3
        this.frameCount = 3
        this.frameDuration = 0.15
        this.framePadding = 10
        this.animator = new Animator(ASSET_MANAGER.getAsset(SPRITES_PATH + "explosion.png"), this.animX, this.animY, this.animWidth, this.animHeight, this.frameCount, this.frameDuration, this.framePadding, false, false);
        this.exploded = false;
    }

    clicked() {
        
    }

    explode() {
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileExploded.png")
        this.exploded = true;
        gameover = true;
        running = false;
    }

    draw(ctx, x, y) {
        this.animator.drawFrame(this.game.clockTick, ctx, x - this.animXBuffer, y - this.animYBuffer, this.animScale)
        this.animation()
    }

    animation() {
        if(this.animator.currentFrame() == 3) {
            this.animY += this.animHeight
            this.animator = new Animator(ASSET_MANAGER.getAsset(SPRITES_PATH + "explosion.png"), this.animX, this.animY, this.animWidth, this.animHeight, this.frameCount, this.frameDuration, this.framePadding, false, false);
            this.animRowCount++
        }
    }
}