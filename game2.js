

var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
// Background 
var background = new Image();
background.src = 'style/img/bg.png';

// Skepp
var xPosShip = 50;
var yPosShip = 200;
var rectWidthShip = 100;
var rectHeightShip = 100;

// Raket
var rocketList = [
	
];
var rectWidthRocket = 2;
var rectHeightRocket = 6;

// Fiende
var xPosEnemy = 50;
var yPosEnemy = 10;
var rectWidthEnemy = 10;
var rectHeightEnemy = 10;

var shipSpeed = 0;


// Game-loop
function gameTick() {
	clear();
	ctx.drawImage(background, 0, 0);
	fill();

	xPosShip += shipSpeed;
	tickRockets();
	setCloseToEdge(xPosShip);
}


function init() {
	var intervalID = window.setInterval(gameTick, 16);
}

// Rensar canvas
function clear() {
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
} 

// FILL FUNCTION
function fill() {
	// Skepp
	ctx.fillRect(xPosShip, yPosShip, rectWidthShip, rectHeightShip);
	ctx.fillStyle='#f3c9fc';

	// Raketer
	rocketList.forEach(function(rocket) {
		ctx.fillRect(rocket.x, rocket.y, rectWidthRocket, rectHeightRocket);
	})

	// Fiende
	ctx.fillRect(xPosEnemy, xPosEnemy, rectWidthEnemy, rectWidthEnemy);
}

function tickRockets() {
	rocketList.forEach(function(rocket) {
		rocket.y = rocket.y - 10;
	})
}

// Sätter en event listener på keydown 
window.addEventListener('keydown', doKeyDown, true);

function doKeyDown(e) {
	// Ship Speed
	if (e.key == 'd') {
		shipSpeed = 2;
	} 
	if (e.key == 'a') {
		shipSpeed = -2;
	}
	// Rocket
	if (e.key == 'm') {
		rocketList.push({
			x: xPosShip,
			y: yPosShip
		});
	}
	if (e.key == 'g') {
		console.log('Game over');
	} 
}

// När skeppet kommer nära kanten, sätt xPosShip till 500 eller 0
// beroende på vilken sida man är på.
function setCloseToEdge(inputx) {
	if(inputx + rectWidthShip >= myCanvas.width) {
		xPosShip = 500;
	} else if (inputx <= 0) {
		xPosShip = 0;
	}
}

