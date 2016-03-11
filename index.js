var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, {origins: 'localhost:3000'}); //only on 3000 socket


app.use(express.static(__dirname + '/dist'));

var rooms = [];


io.on('connection', function (socket) {
    socket.emit('rooms', rooms);


    socket.on('addRoom', function (data) {
        rooms.push(data);
        socket.broadcast.emit('rooms', rooms);
        socket.join(data.roomId.toString());
    });
    console.log('connect');

    socket.on('joinRoom', function (data) {
        socket.join(data.idRoom.toString());
        rooms.forEach(function (item,i) {
            if (data.idRoom == item.roomId) {
                item.enemyId = data.mySocketid;
                io.sockets.in(item.roomId).emit('gameRoom', item);
                rooms.splice(i,1);
                socket.broadcast.emit('rooms', rooms);
            }
        });
    });

    socket.on('startGame', function (data) {
        socket.broadcast.to(data.room.roomId).emit('enemyField', data.gameField);
    });
    socket.on('shot', function (data) {
        socket.broadcast.to(data.room.roomId).emit('enemyShot', {'id': data.id, 'yourTurn': data.yourTurn});
    });
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});

//io.sockets.socket(socketid).emit('message', 'for your eyes only');