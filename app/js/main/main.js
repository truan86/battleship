class MainController {
    constructor(socket, $scope) {
        let here = this;
        socket.on('rooms', function (data) {
            console.log(data);
            $scope.$apply(function () {
                here.rooms = data;
            });
        });
        this.newRoom = function () {
            let roomId = Math.round(Math.random() * 100000);
            socket.emit('addRoom', {'roomId': roomId, 'roomName': this.nameRoom});
            socket.emit('create', roomId);
        };
        this.joinRoom = function (id) {
            alert(id);
        }
    }
}
export default MainController;