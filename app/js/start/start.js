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
                if (this.howCloseTheShip(id)) {
                    for (let i = id; i < id + this.sizeShip; i++) {
                        this.gameField[i].hover = true;
                    }
                }
            }
        }
        else {
            if (+(this.gameField[id].y) + this.sizeShip < 11) {
                if (this.howCloseTheShip(id)) {
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
                if (this.howCloseTheShip(id)) {
                    for (let i = id; i < id + this.sizeShip; i++) {
                        this.gameField[i].hover = false;
                    }
                }
            }
        }
        else {
            if (+(this.gameField[id].y) + this.sizeShip < 11) {
                if (this.howCloseTheShip(id)) {
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
                if (this.howCloseTheShip(id)) {
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
                if (this.howCloseTheShip(id)) {
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

    howCloseTheShip(id) {
        let CloseTheShip = 0;
        this.gameField.forEach(function (item, i) {
            if (i == id - 11 ||
                i == id - 10 ||
                i == id - 9 ||
                i == id - 1 ||
                i == id ||
                i == id + 1 ||
                i == id + 9 ||
                i == id + 10 ||
                i == id + 11
            ) {
                if (item.ship === true) {
                    CloseTheShip += 1;
                }
            }
        });
        if (CloseTheShip == 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
export default StartController;