import howCloseTheShip from './howCloseTheShip';
import victory from './victory';
import enemyShot from './enemyShot';

class StartController {
    constructor(GameService) {
        this.gameService = GameService;
        this.gameField = GameService.gameField;
        this.enemyField = GameService.enemyField;
        this.shipList = GameService.shipList;
        this.countShip = GameService.countShip();
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
        this.enemyField = this.gameField.slice();
        this.showEnemyField = true;
    }

    shot(id) {
        if (this.enemyField[id].ship === false) {
            this.enemyField[id].missed = true;
            enemyShot(this.gameField);
            victory(this.gameField, this.countShip);
        }
        else {
            this.enemyField[id].hit = true;
            victory(this.enemyField, this.countShip);
        }
    }

    hovered(id) {
        if (this.TurnTheShip === false) {
            if (+(this.gameField[id].x) + this.sizeShip < 11) {
                if (howCloseTheShip(id, this.sizeShip, this.TurnTheShip, this.gameField)) {
                    for (let i = id; i < id + this.sizeShip; i++) {
                        this.gameField[i].hover = true;
                    }
                }
            }
        }
        else {
            if (+(this.gameField[id].y) + this.sizeShip < 11) {
                if (howCloseTheShip(id, this.sizeShip, this.TurnTheShip, this.gameField)) {
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
                if (howCloseTheShip(id, this.sizeShip, this.TurnTheShip, this.gameField)) {
                    for (let i = id; i < id + this.sizeShip; i++) {
                        this.gameField[i].hover = false;
                    }
                }
            }
        }
        else {
            if (+(this.gameField[id].y) + this.sizeShip < 11) {
                if (howCloseTheShip(id, this.sizeShip, this.TurnTheShip, this.gameField)) {
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
                if (howCloseTheShip(id, this.sizeShip, this.TurnTheShip, this.gameField)) {
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
                if (howCloseTheShip(id, this.sizeShip, this.TurnTheShip, this.gameField)) {
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
}
export default StartController;