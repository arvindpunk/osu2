let score;
let circles = [];
let minSpawnRate;
let maxSpawnRate;
let spawnRate;
let counter;
let circleCounter;
let backgroundr, backgroundg, backgroundb;

class Circle {
	constructor() {
		this.x = 100 + random(width - 200);
		this.y = 100 + random(height - 200);
		this.r = random(20, 30);
		this.maxr = 100;
		this.circleCounter = circleCounter;
		circleCounter = (circleCounter)%8 + 1;
	}

	render() {
		circle(this.x, this.y, 2 * this.r);
		fill(0, 0, 0, 255);
		text(this.circleCounter, this.x, this.y)
		fill(255, 255, 255, 255);
	}

	update() {
		this.r = constrain(this.r + 0.4, 20, this.maxr);
		if (this.r == this.maxr) {
			score -= 200;
			backgroundr = 255;
			circles.shift();
			spawnRate += 20;
		}
		let alpha = map(this.r, 20, this.maxr, 255, 10);
		fill(255, 255, 255, alpha)
	}

	// TO-DO: Create circle destroy animation
}

function setup() {
	score = 0;
	counter = -1;
	circleCounter = 1;
	spawnRate = 80;
	minSpawnRate = 30;
	maxSpawnRate = 110;

	backgroundr = 200;
	backgroundg = 120;
	backgroundb = 180;
	createCanvas(windowWidth, windowHeight);
	noStroke();
	fill(255, 255, 255, 255);
	textSize(24);
	textFont('Helvetica');
	frameRate(50);
}

function draw() {
	background(backgroundr = constrain(backgroundr - 4, 200, 255), backgroundg, backgroundb);

	// Counter based changes
	counter = (counter + 1)%spawnRate;
	if (counter === 0) {
		circles.push(new Circle());
	}

	// Circles updation and rendering
	textAlign(CENTER, CENTER);
	circles.forEach((circle) => {
		circle.update();
		circle.render();
	});


	// GUI Rendering
	textAlign(LEFT, TOP);
	text("SCORE: ".concat(int(score).toString()), 40, 40);
	text("FPS: ".concat(int(frameRate()).toString()), 400, 40);
}

function mousePressed() {
	if (circles.length > 0) {
		if (dist(circles[0].x, circles[0].y, mouseX, mouseY) <= circles[0].r) {
			score += 100 - circles[0].r;
			circles.shift();
			spawnRate = constrain(spawnRate - 5, minSpawnRate, maxSpawnRate);
		} else {
			backgroundr = 255;
			score -= 20;
			spawnRate += 20;
		}
	}
	console.log(score);
}
