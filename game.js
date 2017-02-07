var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext('2d');

var x = 20;
var speed = 0;


// Game-loop
function gameTick() {
	clear();
	fill();
	x += speed;
}

function init() {
	var intervalID = window.setInterval(gameTick, 1000);
}

// Rensar canvas
function clear() {
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
} 

// Fyller i rektangel

function fill() {
	ctx.fillRect(x, 20, 100, 100);

}
// Sätter en event listener på keydown 
// om man trycker ner D knappen så rör sig rutan åt höger
// annars åker den åt vänster
window.addEventListener('keydown', doKeyDown, true);

function doKeyDown(e) {
	if (e.key == 'd') {
		speed = 10;

	} else {
		speed = -10;
		console.log(e);
	}
}