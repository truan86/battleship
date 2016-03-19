class MainController {
    constructor(GameService, socket, $scope, $state) {
        if (localStorage.user) {
            let user = angular.fromJson(localStorage.user);
            socket.emit('login', {'name': user.name, 'password': user.password})
        }
        this.areYouLogin = false;
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
                here.areYouLogin = true;
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
                here.addedUserName = 'Ok!!User added to db';
                GameService.user = data;
                here.user = GameService.user;
                localStorage.user = angular.toJson(GameService.user);
                here.areYouLogin = true;
                here.openRegistrationWindows = false;
            });
        });
        this.newRoom = function () {
            let roomId = Math.round(Math.random() * 100000);
            socket.emit('addRoom', {'roomId': roomId, 'roomName': this.nameRoom, 'mySocetid': socket.id});
            console.log('create room id:' + roomId);
            $state.go('game');
            GameService.yourTurn = true;
        };
        this.joinRoom = function (id) {
            socket.emit('joinRoom', {'idRoom': id, 'mySocketid': socket.id});
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
            this.areYouLogin = false;
        }
    }
}
export default MainController;