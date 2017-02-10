var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext('2d');

var xPos = 0;
var yPos = 20
var rectWidth = 100;
var rectHeight = 100;
var speed = 0;

// Game-tick
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

/*
function doKeyDown(e) {
	if(e.key == 'd') {
		speed = 1;
		console.log('höger')
	}
	if(e.key == 'a') {
		speed = -1;
		console.log('vänster');
	}
}
*/

function doKeyDown(e) {
	if (e.key == 'd') {
		speed = 2;
		console.log(speed);
	} 
	if (e.key == 'a') {
		speed = -2;
	}
}

function isLegalMoveRight(inputx) {
	if(inputx + rectWidth >= myCanvas.width) {
		xPos = 300;
	}
}

function isLegalMoveLeft(inputx) {
	if(inputx <= 0) {
		xPos = 0;
	}
}

function isInsideBox(xPos) {
	return ((xPos > -1) && (xPos + rectWidth + 1 < myCanvas.width + speed));
}

// Game-loop
function gameTick() {
	clear();
	fill();

	if (isInsideBox) {
		xPos += speed;
		isLegalMoveLeft(xPos);
		isLegalMoveRight(xPos);
	}

/*	if(isLegalMoveLeft(xPos)) {
		xPos
	} */

}
/*
function isInsideBox(xPos) {
	return ((xPos > -1) && (xPos + rectWidth + 1 < myCanvas.width + speed));
}

function closeToLeft(xPos) {
	if((xPos > 1) && (xPos < 11)) {
		xPos = 0;
	}
}
*/
