class Board {
    constructor(game, x, y, rows, cols, numMines) {
        Object.assign(this, { game, x, y, rows, cols, numMines})

        this.grid = []
        this.quards = [];
        this.minelessSquares = this.rows * this.cols - numMines

        for(let i = 0; i < this.rows; i++) {
            this.grid[i] = new Array(this.cols);
        }
    }

    update() {
        if(this.minelessSquares == 0) {
            win = true;
            running = false;
        }
        if(this.game.leftClick) {
            let squareClicked = this.getSquareByPX(this.game.mouse.x, this.game.mouse.y);
            if(squareClicked != null) {
                squareClicked.square.leftClicked();
                if(!squareClicked.square.isFlagged && squareClicked.square.isEmpty) {
                    this.clearSurroundingEmpties(squareClicked.x, squareClicked.y);
                }
            }
        } else if(this.game.rightClick) {
            let squareClicked = this.getSquareByPX(this.game.mouse.x, this.game.mouse.y);
            console.log(squareClicked)
            squareClicked.square.rightClicked();
        }
    }

    draw(ctx) {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.getSquare(i, j).draw(ctx);
            }
        }
    }

    generateBoard() {
        this.generateEmptys();
        this.generateMines();
        this.generateNumbers();
    }
    

    generateMines() {
        var randx;
        var randy;
        for (let i = 0; i < this.numMines; i++) {
            randx = Math.floor(Math.random() * this.cols);
            randy = Math.floor(Math.random() * this.rows);
            let square = this.grid[randy][randx];
            this.grid[randy][randx] = new Square(this, new Mine(), square.x, square.y);
        }
    }

    generateNumbers() {
        let num;
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(!this.getSquare(i, j).isMine) {
                    num = this.findNumTouchingMines(i, j);
                    if(num > 0) {
                        let square = this.getSquare(i, j);
                        this.grid[i][j] = new Square(this, new Number(num), square.x, square.y);
                    }
                }
            }
        }
    }

    generateEmptys() {
        let x = this.x;
        let y = this.y;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = new Square(this, new empty(), x, y);
                x += TILE_WIDTH;
            }
            y += TILE_HEIGHT;
            x = this.x;
        }
    }

    findNumTouchingMines(row, col) {
        let count = 0
        Object.values(this.getSurroundingSquares(row, col)).forEach(s => {
            if (s.square.isMine) {
                count++
            }
        });

        return count
    }

    getSquare(row, col) {
        return this.grid[row][col]
    }

    getSquareByPX(px, py) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if(this.grid[i][j].clicked(px, py)) {
                    return {
                        square: this.grid[i][j],
                        x: i,
                        y: j
                    }
                }
            }
        }
        console.log("square not found")
        return null
    }

    clearSurroundingEmpties(row, col) {
        Object.values(this.getSurroundingSquares(row, col)).forEach(s => {
            if(s.square.isEmpty && s.square.covered) {
                s.square.leftClicked()
                this.clearSurroundingEmpties(s.x, s.y)
            } else if(s.square.hasNumber) {
                s.square.leftClicked()
            }
        })
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
        let squares = []

        //get top left
        if (row > 0 && col > 0) {
            squares["TL"] = {
                square: this.grid[row - 1][col - 1],
                x: row - 1,
                y: col - 1
            }
        }
        //get top middle
        if (row > 0) {
            squares["TM"] = {
                square: this.grid[row - 1][col],
                x: row - 1,
                y: col
            }
        }
        //get top right
        if (row > 0 && col + 1 < this.cols) {
            squares["TR"] = {
                square: this.grid[row - 1][col + 1],
                x: row - 1,
                y: col + 1
            }
        }
        //get middle left
        if (col > 0) {
            squares["ML"] = {
                square: this.grid[row][col - 1],
                x: row,
                y: col - 1
            }
        }
        //get middle right
        if (col + 1 < this.cols) {
            squares["MR"] = {
                square: this.grid[row][col + 1],
                x: row,
                y: col + 1
            }
        }
        //get bottom left
        if (row + 1 < this.rows && col > 0) {
            squares["BL"] = {
                square: this.grid[row + 1][col - 1],
                x: row + 1,
                y: col - 1
            }
        }
        //get bottom middle
        if (row + 1 < this.rows) {
            squares["BM"] = {
                square: this.grid[row + 1][col],
                x: row + 1,
                y: col
            }
        }
        //get bottom right
        if (row + 1 < this.rows && col + 1 < this.cols) {
            squares["BR"] = {
                square: this.grid[row + 1][col + 1],
                x: row + 1,
                y: col + 1
            }
        }
        return squares
    }
}