class Board {
    constructor(game, x, y, rows, cols, numMines) {
        Object.assign(this, { game, x, y, rows, cols, numMines })

        this.grid = [rows][cols]
    }

    update() {

    }

    draw(ctx) {

    }

    generateBoard() {

    }

    findNumTouchingMines(row, col) {
        count = 0

        this.getSurroundingSquares(row, col).forEach(square => {
            if (square.hasMine()) {
                count++
            }
        });

        return count
    }

    /**
     * Gets the surounding squares of the given square coordinates
     * 
     * @param {*} row The x location of the square
     * @param {*} col The y location of the square
     * @returns An array whose indexes represent the location of the square with respect
     * to the passed coordinates ("TL" is top left, "MR" is middle right, "BM" is bottom middle ect...)
     */
    getSurroundingSquares(row, col) {
        squares = []

        //get top left
        if (row > 0 && col > 0) {
            squares["TL"] = this.grid[row - 1][col - 1]
        }
        //get top middle
        if (row > 0) {
            squares["TM"] = this.grid[row - 1][col]
        }
        //get top right
        if (row > 0 && col < this.cols) {
            squares["TR"] = this.grid[row - 1][col + 1]
        }
        //get middle left
        if (col > 0) {
            squares["ML"] = this.grid[row][col - 1]
        }
        //get middle right
        if (col < this.cols) {
            squares["MR"] = this.grid[row][col + 1]
        }
        //get bottom left
        if (row < this.rows && col > 0) {
            squares["BL"] = this.grid[row + 1][col - 1]
        }
        //get bottom middle
        if (row < this.rows) {
            squares["BM"] = this.grid[row + 1][col]
        }
        //get bottom right
        if (row < this.rows && col < this.cols) {
            squares["BR"] = this.grid[row + 1][col + 1]
        }
        return squares
    }
}