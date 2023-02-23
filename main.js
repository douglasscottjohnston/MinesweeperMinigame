const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const SPRITES_PATH = "./assets/Sprites/";
var running = true;
var gameover = false;
var win = false;
let seconds = 0;
function incrementSeconds() {
    if(!gameover) {
        seconds++;
    }
}
console.log(seconds)

function resetSeconds() {
    seconds = 0;
}

// var easy = document.getElementById("easy");
// var medium = document.getElementById("medium");
// var hard = document.getElementById("hard");

// if(easy.checked) {
// 	medium.checked = false;
// 	hard.checked = false;
// }

ASSET_MANAGER.queueDownload(SPRITES_PATH + "explosion.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "Tile1.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "Tile2.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "Tile3.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "Tile4.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "Tile5.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "Tile6.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "Tile7.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "Tile8.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "TileEmpty.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "TileExploded.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "TileFlag.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "TileMine.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "TileUnknown.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "faceSunGlasses.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "faceHappy.png");
ASSET_MANAGER.queueDownload(SPRITES_PATH + "faceDead.png");

TILE_WIDTH = 32;
TILE_HEIGHT = 32;

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});

