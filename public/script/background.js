//----------------- Setup

//canvases and mouse coordinates
var canvas = document.getElementById('back');
var ctx = canvas.getContext('2d');

var cursorX = canvas.width;
var cursorY = canvas.height;
var nCursorX = 0;
var nCursorY = 0;
var ease = 0.1;

//background dots parameters
var dotSpacing = 25;
var dotMovement = 15;
var dotSize = 0.5;
var dotR = 0;
var dotG = 0;
var dotB = 0;
var dotA = 1;

//run setup on DOM load
window.addEventListener("DOMContentLoaded", function () {
	setup();
});

//----------------- Functions

//fit canvas to its container
function fitToContainer() {
	canvas.style.width = '100%';
	canvas.style.height = '100%';
	canvas.style.top = '0px';
	canvas.style.left = '0px';
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}

//random int in range
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//draws dot
function drawDot(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, dotSize, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fillStyle = "rgba("+dotR+", "+dotG+", "+dotB+", "+dotA+")";
	ctx.fill();
}

//----------------- Runtime

//animation setup
function setup() {
	fitToContainer();
	window.requestAnimationFrame(draw);
}

//animation loop
function draw() {
	fitToContainer();
	window.onmousemove = function (event) {
		cursorX = event.x;
		cursorY = event.y;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//ease dots
	var dx = cursorX - nCursorX;
	nCursorX += dx * ease;

	var dy = cursorY - nCursorY;
	nCursorY += dy * ease;

	//draw dots
	for (var i = -dotSpacing; i <= canvas.width + dotSpacing * 2; i += dotSpacing) {
		for (var j = -dotSpacing; j <= canvas.height + dotSpacing * 2; j += dotSpacing) {
			drawDot(i - (nCursorX / canvas.width) * dotMovement, j - (nCursorY / canvas.height) * dotMovement);
		}
	}

	window.requestAnimationFrame(draw);
}