class StartController {
    constructor(GameService) {
        this.gameService = GameService;
        this.gameField = GameService.gameField;
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
                for (let i = id; i < id + this.sizeShip; i++) {
                    this.gameField[i].hover = true;
                }
            }
        }
    }

    lieved(id) {
        if (this.TurnTheShip === false) {
            if (+(this.gameField[id].x) + this.sizeShip < 11) {
                for (let i = id; i < id + this.sizeShip; i++) {
                    this.gameField[i].hover = false;
                }
            }
        }
    }

    setShip(id) {
        if (this.TurnTheShip === false) {
            console.log(+(this.gameField[id].y));
            if (+(this.gameField[id].x) + this.sizeShip < 11) {
                for (let i = id; i < id + this.sizeShip; i++) {
                    this.gameField[i].ship = true;
                }
                this.sizeShip = 0;
                this.shipList[this.shipListId].hide = true;
            }
        }
    }
}
export default StartController;