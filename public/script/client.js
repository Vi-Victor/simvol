// set default username to random number
var username = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000).toString();
var socket = io();

// on event 'chat message' (sent by server), display message, and auto-scroll to bottom of messages in chat
socket.on('chat message', function(msg) {
	$('#messages').append($('<li class="user">').text(msg.user));
	$('#messages').append($('<li class="single-message">').text(msg.message));
	document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
});

// load login into html using AJAX
$('#main-body').load('../page/login.html');

// called when login input is submitted
function changepage() {

	// set username
	if ($('#login-input').val() != '') {
		username = $('#login-input').val();
	}

	// load chat into html using AJAX
	$('#main-body').load('../page/chat.html');

	return false;
}

// called when chat input is submitted
function type() {

	// create message and emit event
	if ($('#m').val() != '') {
		socket.emit('chat message', {user:username, message:$('#m').val()});
	}
	$('#m').val('');

	return false;
}