class MainController {
    constructor(GameService,socket, $scope, $state) {
        let here = this;
        this.rooms;
        socket.on('rooms', function (data) {
            $scope.$apply(function () {
                here.rooms = data;
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

        }
    }
}
export default MainController;