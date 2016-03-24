import howCloseTheShip from './howCloseTheShip';
import victory from './victory';
import enemyShot from './enemyShot';
import hover from './hovered';
import liev from './liev';
import setShips from './setShip';

let room = {};

class StartController {
    constructor(GameService, socket, $scope, $state) {
        GameService.initGameFields();
        GameService.shipListInit();
        this.user = GameService.user;
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
        this.myFieldhidden = true;

        socket.on('enemyShot', function (data) {
            $scope.$apply(function () {
                enemyShot(here.gameField, data.id);
                if (data.yourTurn == true) {
                    here.yourTurn = true;
                }
            });
        });

        socket.on('youLost', function (data) {
            GameService.initGameFields();
            GameService.shipListInit();
            alert('you lost!!!');
            $state.go('main');
        });

        socket.on('gameRoom', function (data) {
            room = data;
        });

        socket.on('joinToRoom', function () {
            $scope.$apply(function () {
                here.myFieldhidden = false;
            });
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
                            $state.go('main');
                            console.log(room);
                            socket.emit('imWin', {"room": room, "user": here.user});
                            GameService.initGameFields();
                            GameService.shipListInit();
                            alert('you win!!!!!');
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

    setShip(id) {
        setShips(id, this.TurnTheShip, this.gameField, this.sizeShip, this.shipList, this.shipListId, this.hideStartGame);
        this.sizeShip = 0;
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

    lieved(id) {
        liev(id, this.TurnTheShip, this.gameField, this.sizeShip);
    }

    hovered(id) {
        hover(id, this.TurnTheShip, this.gameField, this.sizeShip);
    }

    sizeShipFn(size, id) {
        this.sizeShip = size;
        this.shipListId = id;
    }
}
export default StartController;