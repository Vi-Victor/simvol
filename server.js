var express = require('express');
var server = express();
var path = require('path');
var http = require('http').Server(server);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var IP = process.env.IP || '0.0.0.0';

// set Express port
server.set('port', port);

// set 'public' as static directory
server.use(express.static(path.join(__dirname, '/public')));

// load login (index.html)
server.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/page/index.html'));
});

// on 'chat message', get message and emit to all clients
io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

// listen on port and output logs
http.listen(port, IP, function() {
	console.log('listening on port ' + port);
	console.log('simvol CHAT, version 1.0.0, by Vi - Victor Ivanov')
});