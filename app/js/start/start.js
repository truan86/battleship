class StartController {
    constructor(GameService) {
        this.gameService = GameService;
        this.gameField = GameService.gameField;
        this.enemyField = GameService.enemyField;
        this.shipList = GameService.shipList;
        this.sizeShip = 0;
        this.TurnTheShip = false;
    }

    sizeShipFn(size, id) {
        this.sizeShip = size;
        this.shipListId = id;
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
                }
            }
        }
    }

    howCloseTheShip(id, sizeShip, TurnTheShip) {
        let CloseTheShip = 0;
        if (TurnTheShip === false) {
            for (let i = 0; i < sizeShip; i++) {
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
        else {
            let countCell = id;
            for (let i = 0; i < sizeShip; i++) {
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
                countCell += 10;
            }
        }
        if (CloseTheShip == 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
export default StartController;