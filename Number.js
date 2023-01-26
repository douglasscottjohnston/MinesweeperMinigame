class Number {
    constructor(num, x, y, width, height) {
        Object.assign(this, {num, x, y, width, height})
        this.image = getNumberImage()
    }

    clicked() {

    }

    getNumberImage(num) {
        return ASSET_MANAGER.getAsset(SPRITES_PATH + "Tile" + num + ".png")
    }
}