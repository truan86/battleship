class GameService {
    constructor() {
        let fieldSize = 9;
        this.gameField = [];
        for (let i = 0; i <= fieldSize; i++) {
            for (let j = 0; j <= fieldSize; j++) {
                this.gameField.push({
                    "x": i,
                    "y": j,
                    "ship":false
                });
            }
        }
    }
}

export default GameService;