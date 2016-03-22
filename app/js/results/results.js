class ResultsController {
    constructor(GameService, socket, $scope) {
        let here = this;
        if (localStorage.user) {
            let user = angular.fromJson(localStorage.user);
            socket.emit('login', {'name': user.name, 'password': user.password})
        }
        socket.on('loginOk', function (data) {
            $scope.$apply(function () {
                GameService.user = data;
                localStorage.user = angular.toJson(GameService.user);
                GameService.areYouLogin = true;
                here.user = GameService.user;
            });
        });
        this.areYouLogin = GameService.areYouLogin;
        this.user = GameService.user;
    }
}
export default ResultsController;