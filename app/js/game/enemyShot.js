let enemyShot = function (gameField,id) {
    if (gameField[id].ship == true) {
        gameField[id].hit = true;
    }
    else {
        gameField[id].missed = true;
    }
};

export default enemyShot;