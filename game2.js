

var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
// Background 
var background = new Image();
background.src = 'style/img/bg.png';


var xPos = 0;
var yPos = 20
var rectWidth = 100;
var rectHeight = 100;
var speed = 0;


// Game-loop
function gameTick() {
	clear();
	ctx.drawImage(background, 0, 0);
	fill();

	xPos += speed;
	setCloseToEdge(xPos);
}


function init() {
	var intervalID = window.setInterval(gameTick, 16);
}

// Rensar canvas
function clear() {
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
} 

// Fyller i rektangel
function fill() {
	ctx.fillRect(xPos, yPos, rectWidth, rectHeight);
	ctx.fillStyle='#f3c9fc';
}

// Sätter en event listener på keydown 
window.addEventListener('keydown', doKeyDown, true);

function doKeyDown(e) {
	if (e.key == 'd') {
		speed = 2;
	} 
	if (e.key == 'a') {
		speed = -2;
	}
}

function setCloseToEdge(inputx) {
	if(inputx + rectWidth >= myCanvas.width) {
		xPos = 500;
	} else if (inputx <= 0) {
		xPos = 0;
	}
}

