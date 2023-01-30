class Number {
    constructor(num, x, y, width, height) {
        Object.assign(this, {num, x, y, width, height})
        this.image = this.getNumberImage(this.num)
    }

    clicked() {

    }

    getNumberImage(n) {
        return ASSET_MANAGER.getAsset(SPRITES_PATH + "Tile" + n + ".png")
    }
}