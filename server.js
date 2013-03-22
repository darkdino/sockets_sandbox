//socket.io basic server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


server.listen(8080);

app.get('/', function(req, res){
	res.sendfile('index.html');
});


function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }
	return out;
}


io.sockets.on('connection', function (socket) {

	socket.emit('yourid', { id: socket.id});

	console.log('New connection with ID: ' + socket.id);
	
	socket.on('message', function (data){
		
		console.log('<msg ' + data.msg);
		socket.emit('reply', {msg : "Server reply"});
		io.sockets.emit('reply', {msg: "Broadcast reply"});
	});

	socket.on('disconnect', function (socket) {
		console.log('disconnect detected');
	});
	
});


