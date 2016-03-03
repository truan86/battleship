let howCloseTheShip = function(id, sizeShip, TurnTheShip,gameField) {
    let CloseTheShip = 0;
    if (TurnTheShip === false) {
        for (let i = 0; i < sizeShip; i++) {
            if (gameField[id + i].x == 9) {gameField.forEach(function (item, num) {
                    if (num == (id + i) - 11 ||
                        num == (id + i) - 10 ||
                        num == (id + i) - 1 ||
                        num == (id + i) ||
                        num == (id + i) + 9 ||
                        num == (id + i) + 10) {
                        if (item.ship === true) {
                            CloseTheShip += 1;
                        }
                    }
                });
            }
            if (gameField[id + i].x == 0) {
                gameField.forEach(function (item, num) {
                    if (num == (id + i) - 10 ||
                        num == (id + i) - 9 ||
                        num == (id + i) ||
                        num == (id + i) + 1 ||
                        num == (id + i) + 10 ||
                        num == (id + i) + 11) {
                        if (item.ship === true) {
                            CloseTheShip += 1;
                        }
                    }
                });
            }
            if (gameField[id + i].x != 0 && gameField[id + i].x != 9) {
                gameField.forEach(function (item, num) {
                    if (num == (id + i) - 11 ||
                        num == (id + i) - 10 ||
                        num == (id + i) - 9 ||
                        num == (id + i) - 1 ||
                        num == (id + i) ||
                        num == (id + i) + 1 ||
                        num == (id + i) + 9 ||
                        num == (id + i) + 10 ||
                        num == (id + i) + 11) {
                        if (item.ship === true) {
                            CloseTheShip += 1;
                        }
                    }
                });
            }
        }
    }
    if (TurnTheShip === true) {
        let countCell = id;
        for (let i = 0; i < sizeShip; i++) {
            if (gameField[(countCell)].x == 9) {
                gameField.forEach(function (item, num) {
                    if (num == (countCell) - 11 ||
                        num == (countCell) - 10 ||
                        num == (countCell) - 1 ||
                        num == (countCell) ||
                        num == (countCell) + 9 ||
                        num == (countCell) + 10) {
                        if (item.ship === true) {
                            CloseTheShip += 1;
                        }
                    }
                });
            }
            if (gameField[(countCell)].x == 0) {
                gameField.forEach(function (item, num) {
                    if (num == (countCell) - 10 ||
                        num == (countCell) - 9 ||
                        num == (countCell) ||
                        num == (countCell) + 1 ||
                        num == (countCell) + 10 ||
                        num == (countCell) + 11) {
                        if (item.ship === true) {
                            CloseTheShip += 1;
                        }
                    }
                });
            }
            if (gameField[countCell].x != 0 && gameField[countCell].x != 9) {
                gameField.forEach(function (item, num) {
                    if (num == (countCell) - 11 ||
                        num == (countCell) - 10 ||
                        num == (countCell) - 9 ||
                        num == (countCell) - 1 ||
                        num == (countCell) ||
                        num == (countCell) + 1 ||
                        num == (countCell) + 9 ||
                        num == (countCell) + 10 ||
                        num == (countCell) + 11) {
                        if (item.ship === true) {
                            CloseTheShip += 1;
                        }
                    }
                });
            }
            countCell += 10;
        }
    }
    if (CloseTheShip === 0) {
        return true;
    }
    else {
        return false;
    }
};

export default howCloseTheShip;
