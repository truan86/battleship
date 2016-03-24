import howCloseTheShip from'./howCloseTheShip';

let liev = function (id, TurnTheShip, gameField, sizeShip) {
    if (TurnTheShip === false) {
        if (+(gameField[id].x) + sizeShip < 11) {
            if (howCloseTheShip(id, sizeShip, TurnTheShip, gameField)) {
                for (let i = id; i < id + sizeShip; i++) {
                    gameField[i].hover = false;
                }
            }
        }
    }
    else {
        if (+(gameField[id].y) + sizeShip < 11) {
            if (howCloseTheShip(id, sizeShip, TurnTheShip, gameField)) {
                let countCell = id;
                for (let i = 0; i < sizeShip; i++) {
                    gameField[countCell].hover = false;
                    countCell += 10;
                }
            }
        }
    }
};

export default liev;