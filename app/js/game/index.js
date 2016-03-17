import howCloseTheShip from './howCloseTheShip';
import victory from './victory';
import enemyShot from './enemyShot';

let room = {};

class StartController {
    constructor(GameService, socket, $scope, $state) {
        let here = this;
        this.yourTurn = GameService.yourTurn;
        this.gameService = GameService;
        this.gameField = GameService.gameField;
        this.enemyField = GameService.enemyField;
        this.shipList = GameService.shipList;
        this.countShip = GameService.countShip();
        this.sizeShip = 0;
        this.TurnTheShip = false;
        this.hideStartGame = true;
        this.showEnemyField = false;
        this.canIshot = false;
        this.whoseTurn = false;

        socket.on('enemyShot', function (data) {
            $scope.$apply(function () {
                enemyShot(here.gameField, data.id);
                if (data.yourTurn == true) {
                    here.yourTurn = true;
                }
            });
        });
        socket.on('youLost', function (data) {
            alert('you lost!!!');
            $state.go('main');
        });
        socket.on('gameRoom', function (data) {
            room = data;
        });

        socket.on('enemyField', function (data) {
            $scope.$apply(function () {
                here.showEnemyField = true;
                here.enemyField = data;
            });
        });

        this.startGameFn = function () {
            socket.emit('startGame', {'gameField': this.gameField, 'room': room});
            this.canIshot = true;
            this.whoseTurn = true;
            this.hideStartGame = true;
        };

        this.shot = function (id) {
            if (this.canIshot) {
                if (this.yourTurn) {
                    if (this.enemyField[id].ship === false) {
                        this.enemyField[id].missed = true;
                        this.yourTurn = false;
                        socket.emit('shot', {'id': id, 'room': room, 'yourTurn': true});
                    }
                    else {
                        this.enemyField[id].hit = true;
                        if (victory(this.enemyField, this.countShip)) {
                            alert('you win!!!!!');
                            $state.go('main');
                            socket.emit('imWin', room);
                        }

                        socket.emit('shot', {'id': id, 'room': room, 'yourTurn': false});
                    }
                }
                else {
                    alert('it^s not your turn')
                }
            }
            else {
                alert('you must set ships')
            }
        }


    }

    sizeShipFn(size, id) {
        this.sizeShip = size;
        this.shipListId = id;
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