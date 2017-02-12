
var myCanvas = document.getElementById('myCanvas');
var ctx = myCanvas.getContext('2d');

// Ball 1
var ball1 = {
	x: 300,
	y: 100,
	vx: 5,
  vy: 2,
	radius: 50,
	color: 'blue',
	draw: function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.strokeRect(0, 0, 600, 400);
		ctx.fill();
	}
};

// Ball 2
var ball2 = {
	x: 100,
	y: 100,
	vx: 5,
  vy: 2,
	radius: 50,
	color: 'black',
	draw: function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.strokeRect(0, 0, 600, 400);
		ctx.fill();
	}
};


// Ritar cirklarna 
function draw() {
  ctx.clearRect(0,0, myCanvas.width, myCanvas.height);
  ball1.draw();
  ball2.draw();

  ball1.x += ball1.vx;
  ball1.y += ball1.vy;

  ball2.x += ball2.vx;
  ball2.y += ball2.vy;
  raf = window.requestAnimationFrame(draw);

  // Ball 1
	if (ball1.y + ball1.vy > myCanvas.height || ball1.y + ball1.vy < 0) {
  ball1.vy = -ball1.vy;
	}
	if (ball1.x + ball1.vx > myCanvas.width || ball1.x + ball1.vx < 0) {
  ball1.vx = -ball1.vx;
	}

	// Ball 2
	if (ball2.y + ball2.vy > myCanvas.height || ball2.y + ball2.vy < 0) {
  ball2.vy = -ball2.vy;
	}
	if (ball2.x + ball2.vx > myCanvas.width || ball2.x + ball2.vx < 0) {
  ball2.vx = -ball2.vx;
	}

	var dx = ball1.x - ball2.x;
	var dy = ball1.y - ball2.y;
	var distance = Math.sqrt(dx * dx + dy * dy);
	
	console.log(ball1.radius + ball2.radius);
	
	if(distance < ball1.radius + ball2.radius) {
		// Kollision, sätter ball1 till grön 
		//första gången den nuddar den svarta bollen
		ball1.color = 'green';
	} else {
		// Ingen kollision
		console.log('Ingen Kollision');
	}
}

// Rör sig när man rör musen över
myCanvas.addEventListener('mouseover', function(e) {
  raf = window.requestAnimationFrame(draw);
  console.log('mouse over');
});
// Slutar röra sig
myCanvas.addEventListener('mouseout', function(e) {
  window.cancelAnimationFrame(raf);
  console.log('mouse out');
});


ball1.draw();
ball2.draw();
