import howCloseTheShip from './howCloseTheShip';

let setShips = function (id, TurnTheShip, gameField, sizeShip, shipList, shipListId, hideStartGame) {
    if (TurnTheShip === false) {
        if (+(gameField[id].x) + sizeShip < 11) {
            if (howCloseTheShip(id, sizeShip, TurnTheShip, gameField)) {
                for (let i = id; i < id + sizeShip; i++) {
                    gameField[i].ship = true;
                }
                sizeShip = 0;
                shipList[shipListId].hide = true;
                let countHidenShipList = 0;
                shipList.forEach(function (item) {
                    if (item.hide == true) {
                        countHidenShipList += 1;
                    }
                });
                if (countHidenShipList == shipList.length) {
                    hideStartGame = false;
                }
            }
        }
    }
    else {
        if (+(gameField[id].y) + sizeShip < 11) {
            if (howCloseTheShip(id, sizeShip, TurnTheShip, gameField)) {
                let countCell = id;
                for (let i = 0; i < sizeShip; i++) {
                    gameField[countCell].ship = true;
                    countCell += 10;
                }
                shipList[shipListId].hide = true;
            }
        }
    }
};

export default setShips;