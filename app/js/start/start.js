class StartController {
    constructor(GameService) {
        this.gameService = GameService;
        this.gameField = GameService.gameField;
        this.enemyField = GameService.enemyField;
        this.shipList = GameService.shipList;
        this.sizeShip = 0;
        this.TurnTheShip = false;
        this.hideStartGame = true;
        this.showEnemyField = false;
    }

    sizeShipFn(size, id) {
        this.sizeShip = size;
        this.shipListId = id;
    }


    startGameFn() {
        this.enemyField = this.gameField;
        this.showEnemyField = true;
    }

    shot(id) {
        if (this.enemyField[id].ship === false) {
            this.enemyField[id].missed = true;
        }
        else {
            this.enemyField[id].hit = true;
        }
    }

    hovered(id) {
        if (this.TurnTheShip === false) {
            if (+(this.gameField[id].x) + this.sizeShip < 11) {
                if (this.howCloseTheShip(id, this.sizeShip, this.TurnTheShip)) {
                    for (let i = id; i < id + this.sizeShip; i++) {
                        this.gameField[i].hover = true;
                    }
                }
            }
        }
        else {
            if (+(this.gameField[id].y) + this.sizeShip < 11) {
                if (this.howCloseTheShip(id, this.sizeShip, this.TurnTheShip)) {
                    let countCell = id;
                    for (let i = 0; i < this.sizeShip; i++) {
                        this.gameField[countCell].hover = true;
                        countCell += 10;
                    }
                }
            }
        }
    }

    lieved(id) {
        if (this.TurnTheShip === false) {
            if (+(this.gameField[id].x) + this.sizeShip < 11) {
                if (this.howCloseTheShip(id, this.sizeShip, this.TurnTheShip)) {
                    for (let i = id; i < id + this.sizeShip; i++) {
                        this.gameField[i].hover = false;
                    }
                }
            }
        }
        else {
            if (+(this.gameField[id].y) + this.sizeShip < 11) {
                if (this.howCloseTheShip(id, this.sizeShip, this.TurnTheShip)) {
                    let countCell = id;
                    for (let i = 0; i < this.sizeShip; i++) {
                        this.gameField[countCell].hover = false;
                        countCell += 10;
                    }
                }
            }
        }
    }

    setShip(id) {
        if (this.TurnTheShip === false) {
            if (+(this.gameField[id].x) + this.sizeShip < 11) {
                if (this.howCloseTheShip(id, this.sizeShip, this.TurnTheShip)) {
                    for (let i = id; i < id + this.sizeShip; i++) {
                        this.gameField[i].ship = true;
                    }
                    this.sizeShip = 0;
                    this.shipList[this.shipListId].hide = true;
                    let countHidenShipList = 0;
                    this.shipList.forEach(function (item) {
                        if (item.hide == true) {
                            countHidenShipList += 1;
                        }
                    });
                    if (countHidenShipList == this.shipList.length) {
                        this.hideStartGame = false;
                    }
                }
            }
        }
        else {
            if (+(this.gameField[id].y) + this.sizeShip < 11) {
                if (this.howCloseTheShip(id, this.sizeShip, this.TurnTheShip)) {
                    let countCell = id;
                    for (let i = 0; i < this.sizeShip; i++) {
                        this.gameField[countCell].ship = true;
                        countCell += 10;
                    }
                    this.sizeShip = 0;
                    this.shipList[this.shipListId].hide = true;
                    let countHidenShipList = 0;
                    this.shipList.forEach(function (item) {
                        if (item.hide == true) {
                            countHidenShipList += 1;
                        }
                    });
                    if (countHidenShipList == this.shipList.length) {
                        this.hideStartGame = false;
                    }
                }
            }
        }
    }

    howCloseTheShip(id, sizeShip, TurnTheShip) {
        let CloseTheShip = 0;
        if (TurnTheShip === false) {
            for (let i = 0; i < sizeShip; i++) {
                if (this.gameField[id + i].x == 9) {
                    this.gameField.forEach(function (item, num) {
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
                if (this.gameField[id + i].x == 0) {
                    this.gameField.forEach(function (item, num) {
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
                if (this.gameField[id + i].x != 0 && this.gameField[id + i].x != 9) {
                    this.gameField.forEach(function (item, num) {
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
                if (this.gameField[(countCell)].x == 9) {
                    this.gameField.forEach(function (item, num) {
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
                if (this.gameField[(countCell)].x == 0) {
                    this.gameField.forEach(function (item, num) {
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
                if (this.gameField[countCell].x != 0 && this.gameField[countCell].x != 9) {
                    this.gameField.forEach(function (item, num) {
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
    }
}
export default StartController;