class empty {
    constructor(board, x, y) {
        Object.assign(this, {board, x, y})
        this.image = ASSET_MANAGER.getAsset(SPRITES_PATH + "TileEmpty.png");
    }

    clicked() {
        this.board.clearSurroundingEmpties(this.x, this.y)
    }
}