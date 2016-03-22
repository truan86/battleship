class MainController {
    constructor(GameService, socket, $scope, $state) {
        this.areYouLogin = GameService.areYouLogin;
        this.user = GameService.user;
        this.openRegistrationWindows = false;
        this.addedUserName = '';
        let here = this;
        this.openRegistration = function () {
            (this.openRegistrationWindows == false) ? this.openRegistrationWindows = true : this.openRegistrationWindows = false;
        };
        this.rooms;
        socket.on('loginOk', function (data) {
            $scope.$apply(function () {
                GameService.user = data;
                here.user = GameService.user;
                localStorage.user = angular.toJson(GameService.user);
                GameService.areYouLogin = true;
                here.areYouLogin = GameService.areYouLogin;
                here.openRegistrationWindows = false;
            });
        });
        socket.on('loginError', function () {
            alert('Bad login or password.Try again.');
        });
        socket.on('rooms', function (data) {
            $scope.$apply(function () {
                here.rooms = data;
            });
        });
        socket.on('badUserName', function (data) {
            $scope.$apply(function () {
                here.addedUserName = 'try another name';
            });
        });
        socket.on('UserNameAddToDb', function (data) {
            $scope.$apply(function () {
                GameService.user = data;
                here.user = GameService.user;
                localStorage.user = angular.toJson(GameService.user);
                GameService.areYouLogin = true;
                here.areYouLogin = GameService.areYouLogin;
                here.openRegistrationWindows = false;
            });
        });
        this.newRoom = function () {
            let roomId = Math.round(Math.random() * 100000);
            socket.emit('addRoom', {
                'roomId': roomId,
                'roomName': here.user.name,
                'mySocetid': socket.id,
                "player1": here.user
            });
            console.log('create room id:' + roomId);
            $state.go('game');
            GameService.yourTurn = true;
        };

        this.joinRoom = function (id) {
            socket.emit('joinRoom', {'idRoom': id, 'mySocketid': socket.id, "user": here.user});
            $state.go('game');
        };

        this.submitAddUser = function () {
            socket.emit('addUser', {"name": this.addUserName, "password": this.addUserPassword, "socketId": socket.id})
        };
        this.login = function () {
            socket.emit('login', {'name': this.loginName, 'password': this.loginPassword})
        };
        this.logOut = function () {
            GameService.user = {};
            this.user = GameService.user;
            localStorage.clear();
            GameService.areYouLogin = false;
            here.areYouLogin = GameService.areYouLogin;
        }
    }
}
export default MainController;