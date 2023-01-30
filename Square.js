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
    }

    draw(ctx) {
        // console.log(this.image)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
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
                console.log(this.board.minelessSquares)
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