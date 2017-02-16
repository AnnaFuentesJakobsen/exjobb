var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
// Background 
var background = new Image();
background.src = 'style/img/bg.png';

// Skepp
var xPosShip = 300;
var yPosShip = 300;
var rectWidthShip = 40;
var rectHeightShip = 40;

var shipSpeed = 0;

// Fiende
var enemyList = [
	{
		xPos: 50,
		yPos: 200,
		radius: 10,
	}, 
	{
		xPos: 100,
		yPos: 200,
		radius: 10,
	} 
]

var enemySpeed = 2;

// Skott
var rocketList = [
	
];
var rectWidthRocket = 2;
var rectHeightRocket = 6;
var rocketRadius = 10;


// Game-loop
function gameTick() {
	clear();
	ctx.drawImage(background, 0, 0);
	fill();

	// Gör så att skeppet rör sig
	xPosShip += shipSpeed;

	moveEnemy();
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
		ctx.beginPath();
		ctx.arc(rocket.x, rocket.y, rocketRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	});

	// Fiender
  	enemyList.forEach(function(enemy) {
			ctx.beginPath();
			ctx.arc(enemy.xPos, enemy.yPos, enemy.radius, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
	});
}

// Kollisionshantering
function collisionDetection(rocket, enemy) {
	var dx = rocket.x - enemy.xPos;
	var dy = rocket.y - enemy.yPos;
		
	var distance = Math.sqrt(dx * dx + dy * dy);

	if(distance < rocketRadius + enemy.radius) {
		return true
	} else {
		return false
	}
};
// Går igenom varje raket och kollar varje fiende 
// som finns kvar i listan
function tickRockets() {
	rocketList.forEach(function(rocket, rocketidx) {
		rocket.y = rocket.y - 1;

		enemyList.forEach(function(enemy, enemyidx) {
			if(collisionDetection(rocket, enemy)) {
				enemyList.splice(enemyidx, 1);
				rocketList.splice(rocketidx, 1);
			}
		});
	});
}


// Gör så att fienderna rör sig 
function moveEnemy() {
	enemyList.forEach(function(enemy) {
		console.log(enemy.xPos += enemySpeed);
	});
};

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
	// Game Over
	if (e.key == 'g') {
		console.log('Game over');
	} 
}

// När skeppet kommer nära kanten, sätt xPosShip till 500 eller 0
// beroende på vilken sida man är på.
function setCloseToEdge(inputx) {
	if(inputx + rectWidthShip >= 580) {
		xPosShip = 540;
	} else if (inputx <= 20) {
		xPosShip = 20;
	}
}

