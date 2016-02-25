class StartController {
    constructor(GameService) {
        this.gameService = GameService;
        this.gameField = GameService.gameField;
    }
}
export default StartController;