class GameService {
    constructor() {
        this.user = {};
        this.yourTurn = false;
        let fieldSize = 9;
        this.gameField = [];
        this.enemyField = [];
        for (let i = 0; i <= fieldSize; i++) {
            for (let j = 0; j <= fieldSize; j++) {
                this.gameField.push({
                    "y": i,
                    "x": j,
                    "ship": false,
                    "hover": false,
                    "hit": false,
                    "missed": false
                });
                this.enemyField.push({
                    "y": i,
                    "x": j,
                    "ship": false,
                    "hover": false,
                    "missed": false,
                    "hit": false
                });
            }
        }
        this.shipList = [{
            "name": "Small Ship",
            "size": 1,
            "hide": false
        }, {
            "name": "Small Ship",
            "size": 1,
            "hide": false
        }, {
            "name": "Small Ship",
            "size": 1,
            "hide": false
        }, {
            "name": "Middle Ship",
            "size": 3,
            "hide": false
        }, {
            "name": "Middle Ship",
            "size": 3,
            "hide": false
        }, {
            "name": "Huge Ship",
            "size": 5,
            "hide": false
        }];

        this.countShip = function () {
            let ships = 0;
            this.shipList.forEach(function (item) {
                ships += item.size;
            });
            return ships;
        }
    }
}

export default GameService;