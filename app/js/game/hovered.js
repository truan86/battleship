let hovered = function (id,here) {
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
};

export default hovered;