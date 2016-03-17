class MainController {
    constructor(GameService, socket, $scope, $state) {
        this.successUserName = '';
        let here = this;
        this.rooms;
        socket.on('rooms', function (data) {
            $scope.$apply(function () {
                here.rooms = data;
            });
        });
        socket.on('badUserName', function (data) {
            $scope.$apply(function () {
                here.successUserName = 'try another name';
            });
        });
        socket.on('UserNameAddToDb', function (data) {
            $scope.$apply(function () {
                here.successUserName = 'Ok!!User added to db';
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
    }

    openModal() {
alert(7865);
    }
}
export default MainController;