var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');
// Background 
var background = new Image();
background.src = 'style/img/bg.png';

// Om variabeln är true visas cirklarna om inte så blir det false, för rendering
//var flag = 

// Skepp

var shipImg = new Image();
shipImg.src = 'style/img/ship.png';

var xPosShip = 300;
var yPosShip = 300;
var rectWidthShip = 20;
var rectHeightShip = 20;

var shipSpeed = 0;

// Fiende
var enemyImg = new Image();
enemyImg.src = 'style/img/invader1.png';

var enemyList = [ ];
var enemySpeed = 2;

function createInvaders() {
	for(var i = 1; i <= 5; i++) {
		for(var j = 0; j <= 10; j++) {
			enemyList.push({
				xPos: 50 + j * 30,
				yPos: 50 + i * 30,
				radius: 10
			});
		}
	}
}


// Skott
var rocketImg = new Image();
rocketImg.src = 'style/img/rocket.png';

var rocketList = [ ];
var rectWidthRocket = 2;
var rectHeightRocket = 6;
var rocketRadius = 4;


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
	// Hämtar fienderna en gång
	createInvaders();
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
	ctx.drawImage(shipImg, xPosShip, yPosShip);

	// Fiender
  	enemyList.forEach(function(enemy) {
			ctx.beginPath();
			ctx.arc(enemy.xPos, enemy.yPos, enemy.radius, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.drawImage(enemyImg, enemy.xPos, enemy.yPos);
	});

  // Raketer
		rocketList.forEach(function(rocket) {
		ctx.beginPath();
		ctx.arc(rocket.x, rocket.y, rocketRadius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
		ctx.drawImage(rocketImg, rocket.x, rocket.y);
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
		rocket.y = rocket.y - 10;

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
		enemy.xPos += enemySpeed;
		if (enemy.xPos >= 560) {
			enemySpeed = -2;
		} else if (enemy.xPos <= 20) {
			enemySpeed = 2;
		}
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
	if(inputx + rectWidthShip >= 560) {
		xPosShip = 540;
	} else if (inputx <= 20) {
		xPosShip = 20;
	}
}

