class Square {
    constructor(game, object, x, y, width, height) {
        Object.assign(this, {game, object, x, y, width, height})
        this.covered = true
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileUnknown.png")
        this.isFlagged = false
        this.isEmpty = object instanceof empty
    }

    update() {

        // if(this.game.leftClick) {
        //     this.covered = false
        //     this.image = ASSET_MANAGER.getAsset(object.image)
        //     this.object.clicked()
        // } else if(this.game.rightClick) {
        //     this.
        // }
    }

    draw(ctx) {
        
    }

    leftClicked() {

    }

    rightClicked()

    flag() {
        this.isFlagged = true
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileFlag.png")
    }

    hasMine() {
        return this.object instanceof Mine
    }
}