//set default username to random number
var username = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000).toString();
var socket = io();
var chatting = false;

//on event 'chat message', display message, and auto-scroll to bottom of messages in chat
socket.on('chat message', function(msg) {
	var mes = document.getElementById('messages');

	var name = document.createElement('li');
	name.className = 'user';
	var nameText = document.createTextNode(msg.user);
	name.appendChild(nameText);
	mes.appendChild(name);

	var text = document.createElement('li');
	text.className = 'single-message';
	var textText = document.createTextNode(msg.message);
	text.appendChild(textText);
	mes.appendChild(text);

	document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
});

//on 'user change', update user count
socket.on('user change', function(num) {
	if (chatting) document.getElementById('user-count').innerHTML = "Online: " + num;
});

//load login page
load('../page/login.html', document.getElementById('main-body'));

//when login input is submitted
function changepage() {

	//set username
	if (document.getElementById('login-input').value != '') {
		username = document.getElementById('login-input').value;
	}

	//load chat
	load('../page/chat.html', document.getElementById('main-body'));
	chatting = true;

	return false;
}

//when chat input is submitted
function type() {

	//create message and emit event
	if (document.getElementById('m').value != '') {
		socket.emit('chat message', {user:username, message:document.getElementById('m').value});
	}
	document.getElementById('m').value = '';

	return false;
}

//load external html into element
function load(url, element) {
    req = new XMLHttpRequest();
    req.open("GET", url);
    req.send();
    req.addEventListener("load", function () {
    	element.innerHTML = req.responseText; 
    });
}