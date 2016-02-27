class GameService {
    constructor() {
        let fieldSize = 9;
        this.gameField = [];
        this.enemyField = [];
        for (let i = 0; i <= fieldSize; i++) {
            for (let j = 0; j <= fieldSize; j++) {
                this.gameField.push({
                    "y": i,
                    "x": j,
                    "ship": false,
                    "hover": false
                });
                this.enemyField.push({
                    "y": i,
                    "x": j,
                    "ship": false,
                    "hover": false
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


    }
}

export default GameService;