var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext('2d');

var xPos = 20;
var yPos = 20
var rectWidth = 100;
var rectHeight = 100;

var speed = 0;


// Game-loop
function gameTick() {
	clear();
	fill();

	if (isLegalMoveRight(xPos + speed)) {
		xPos += speed;
	}/* else if (isLegalMoveLeft(xPos)) {
		xPos = 0;
	}*/
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

}

// Sätter en event listener på keydown 

window.addEventListener('keydown', doKeyDown, true);

function doKeyDown(e) {
	if (e.key == 'd') {
		speed = 10;
	} 
	if (e.key == 'a') {
		speed = -10;
	}
}

function isLegalMoveRight(inputx) {
	if(inputx + rectWidth >= myCanvas.width) {
		return false;
	} else {
		return true;
	}
}

function isLegalMoveLeft(inputx) {
	if(inputx < 0) {
		return false;
	} else {
		return true;
	}
}
