// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.leftClick = false;
        this.rightClick = false;
        this.ctrl = false;
        this.mouse = {
            x: -100,
            y: -100
        }
        this.wheel = null;
        this.keys = {};

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);

        this.ctx.canvas.addEventListener("mousedown", e => {
            console.log(this.keys['Control'])
            if(e.button === 0 && this.keys['Control']) {
                this.rightClick = true;
            } else if(e.button === 0) {
                this.leftClick = true;
            } else if(e.button === 2) {
                this.rightClick = true;
            }
        });


        this.ctx.canvas.addEventListener("mouseup", e => {
            this.leftClick = false;
            this.rightClick = false;
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            // if (this.options.debugging) {
            //     console.log("RIGHT_CLICK", getXandY(e));
            // }
            e.preventDefault();
        });

    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {
        let entitiesCount = this.entities.length;
        if(running) {
            
    
            for (let i = 0; i < entitiesCount; i++) {
                let entity = this.entities[i];
    
                if (!entity.removeFromWorld) {
                    entity.update();
                }
            }
    
            for (let i = this.entities.length - 1; i >= 0; --i) {
                if (this.entities[i].removeFromWorld) {
                    this.entities.splice(i, 1);
                }
            }

            this.camera.update();
        } else {
            for (let i = 0; i < entitiesCount; i++) {
                let entity = this.entities[i];
    
                if (!entity.removeFromWorld && !(entity instanceof Board)) {
                    entity.update();
                }
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
        // this.leftClick = false;
        // this.rightClick = false;
    };

};

// KV Le was here :)