class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        this.title = true;
        this.credits = false;
        this.level = null;

        this.menuSelect = {
            mario: false,
            luigi: false,
            credits: false
        }

        this.dificultySelect = {
            easy: false,
            medium: false,
            hard: false
        }

        this.menuSelectIndex = -10;
        this.creditsLineIndex = 0;
        this.menuButtonTimer = 0.15;
        this.menuButtonCooldown = 0.15;

        this.Board;

        this.Dificulty = this.getDificulty();
        this.loadLevel(this.Dificulty);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(dificulty) {

        this.clearEntities();

        this.Board = new Board(this.game, dificulty.x, dificulty.y, dificulty.rows, dificulty.cols, dificulty.mines);

        this.Board.generateBoard();

        this.game.addEntity(this.Board)

        this.game.addEntity(new face(this.game, 500, 45, 50, 50))
    };

    update() {
        if(this.Dificulty != this.getDificulty()) {
            this.Dificulty = this.getDificulty();
            this.loadLevel(this.Dificulty)
        }
    };

    addCoin() {
        if (this.coins++ === 100) {
            this.coins = 0;
            this.lives++;
        }
    };

    draw(ctx) {

    }

    reload() {
        running = true;
        win = false;
        gameover = false;
        this.loadLevel(this.Dificulty);
    }

    getDificulty() {
        let diffs = document.getElementsByName("dificulty")

        for (let i = 0; i < diffs.length; i++) {
            if(diffs[i].checked) {
                if(diffs[i].value == "easy") {
                    return easy;
                } else if(diffs[i].value == "medium") {
                    return medium;
                } else {
                    return hard;
                }
            }
        }
    }
};