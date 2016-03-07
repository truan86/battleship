var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, {origins: 'localhost:3000'}); //only on 3000 socket


app.use(express.static(__dirname + '/dist'));

var rooms = [];


io.on('connection', function (socket) {
    socket.emit('rooms', rooms);

    socket.on('addRoom', function (data) {
        console.log(data);
        rooms.push(data);
        socket.emit('rooms', rooms);
    });
    console.log('connect');
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});

//io.sockets.socket(socketid).emit('message', 'for your eyes only');