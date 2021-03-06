import howCloseTheShip from './howCloseTheShip';

let hover = function (id, TurnTheShip, gameField, sizeShip) {
    if (TurnTheShip === false) {
        if (+(gameField[id].x) + sizeShip < 11) {
            if (howCloseTheShip(id, sizeShip, TurnTheShip, gameField)) {
                for (let i = id; i < id + sizeShip; i++) {
                    gameField[i].hover = true;
                }
            }
        }
    }
    else {
        if (+(gameField[id].y) + sizeShip < 11) {
            if (howCloseTheShip(id, sizeShip, TurnTheShip, gameField)) {
                let countCell = id;
                for (let i = 0; i < sizeShip; i++) {
                    gameField[countCell].hover = true;
                    countCell += 10;
                }
            }
        }
    }
};

export default hover;