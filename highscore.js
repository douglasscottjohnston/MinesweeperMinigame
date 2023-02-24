// var easyHighscore = localStorage.getItem("easyHighscore");
// var mediumHighscore = localStorage.getItem("mediumHighscore");
// var hardHighscore = localStorage.getItem("hardHighscore");
var highScore = 0;

function showHighScore(dificulty) {
    // if(dificulty.type == 'easy' && easyHighscore != null) {
    //     highScore = easyHighscore;
    // } else if(dificulty.type == 'medium' && mediumHighscore != null) {
    //     highScore = mediumHighscore;
    // } else if(dificulty.type == 'hard' && hardHighscore != null) {
    //     highScore = hardHighscore;
    // }

    highScore = localStorage.getItem(dificulty.score);

    if(highScore == null || isNaN(highScore)) {
        highScore = "...";
    }

    document.getElementById('bestScore').innerHTML  = "Best: " + highScore;
};

function setHighScore(dificulty, time) {
    if(highScore == "..." || time < highScore) {
        localStorage.setItem(dificulty.score, Math.floor(time));
    }
}