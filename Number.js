class Number {
    constructor(board, num, x, y) {
        Object.assign(this, {board, num, x, y})
        this.image = this.getNumberImage(this.num)
    }

    clicked() {
        let flagcount = 0
        Object.values(this.board.getSurroundingSquares(this.x, this.y)).forEach(s => {
            if(s.square.isFlagged) {
                flagcount++
            }
        })

        console.log(flagcount)

        if(flagcount == this.num) {
            Object.values(this.board.getSurroundingSquares(this.x, this.y)).forEach(s => {
                if(s.square.covered) {
                    s.square.leftClicked();
                }
            })
        }
    }

    getNumberImage(n) {
        return ASSET_MANAGER.getAsset(SPRITES_PATH + "Tile" + n + ".png")
    }
}