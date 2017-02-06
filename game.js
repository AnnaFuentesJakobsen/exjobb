var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext('2d');

var x = 20;
var speed = 0;

function gameTick() {
	clear();
	fill();
	x += speed;
}

function init() {
	var intervalID = window.setInterval(gameTick, 1000);
}

function clear() {
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
} 

function fill() {
	ctx.fillRect(x, 20, 100, 100);

}

window.addEventListener('keydown', doKeyDown, true);

function doKeyDown(e) {
	if (e.key == 'd') {
		speed = 10;

	} else {
		speed = -10;
		console.log(e);
	}
}