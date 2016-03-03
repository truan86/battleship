let enemyShot = function (gameField) {
    let randomShot = randomInteger(0, 99);
    if (gameField[randomShot].ship == true) {
        gameField[randomShot].hit = true;
        enemyShot(gameField);
    }
    else {
        gameField[randomShot].missed = true;
    }
};

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

export default enemyShot;