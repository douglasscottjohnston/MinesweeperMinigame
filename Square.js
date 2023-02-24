class Square {
    constructor(board, object, x, y) {
        Object.assign(this, {board, object, x, y})
        this.width = TILE_WIDTH;
        this.height = TILE_HEIGHT;
        this.covered = true
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileUnknown.png")
        this.isFlagged = false
        this.isEmpty = object instanceof empty
        this.isMine = object instanceof Mine
        this.hasNumber = object instanceof Number
        this.flagBufferLimit = 10
        this.flagBuffer = 0
        this.unflagBufferLimit = 10
        this.unflagBuffer = 0
        this.endTiming = 0
        this.endStart = 0
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        let isMyTurn = this.board.game.timer.gameTime >= this.endStart + this.endTiming
        if(this.isMine && gameover && isMyTurn && !win) {
            this.image = this.object.image
            this.object.draw(ctx, this.x, this.y)
        }
    }

    leftClicked() {
        if(!this.isFlagged && this.covered) {
            this.covered = false
            if(this.isMine) {
                this.object.explode();
                this.image = this.object.image;
            } else {
                this.image = this.object.image;
                this.board.minelessSquares--;
                if(this.isEmpty) {
                    this.object.clicked();
                }
            }
        } else {
            this.object.clicked();
        }
    }

    rightClicked() {
        if(!this.isFlagged && this.covered) {
            if(this.flagBuffer == this.flagBufferLimit) {
                this.isFlagged = true
                this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileFlag.png")
                this.board.flags--;
                this.flagBuffer = 0
            } else {
                this.flagBuffer++
            }
        } else if(this.covered) {
            if(this.unflagBuffer == this.unflagBufferLimit) {
                this.isFlagged = false
                this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileUnknown.png")
                this.board.flags++;
                this.unflagBuffer = 0
            } else {
                this.unflagBuffer++
            }
        }
    }

    // hasMine() {
    //     return this.object instanceof Mine
    // }

    clicked(cx, cy) {
        return cx >= this.x && cx <= (this.x + this.width) && cy >= this.y && cy <= this.y + this.height
    }
}