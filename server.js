var express = require('express');
var server = express();
var path = require('path');
var http = require('http').Server(server);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var IP = process.env.IP || '0.0.0.0';

server.set('port', port);

//set public directory
server.use(express.static(path.join(__dirname, '/public')));

var userCount = 0;

//get index.html
server.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/page/index.html'));
});

io.on('connection', function(socket) {
	//on user connection, emit user count to all clients
	userCount++;

	//on chat message, emit message to all clients
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});

	//on user disconnection, emit user count to all clients
	socket.on('disconnect', function() {
		userCount--;
	});

	setInterval(updateUsers, 1000);
});

function updateUsers() {
	io.emit('user change', userCount);
}

//listen on port
http.listen(port, IP, function() {
	console.log('listening on port ' + port);
	console.log('simvol CHAT')
});