let score;
let circles = [];
let minSpawnRate;
let maxSpawnRate;
let spawnRate;
let counter;

class Circle {
	constructor() {
		this.x = 100 + random(width - 200);
		this.y = 100 + random(height - 200);
		this.r = random(20, 30);
		this.maxr = 100;
	}

	render() {
		circle(this.x, this.y, 2 * this.r);
		fill(255, 255, 255, 255);
	}

	update() {
		this.r = constrain(this.r + 0.4, 20, this.maxr);
		if (this.r == this.maxr) {
			score -= 200;
			circles.shift();
			spawnRate += 20;
			console.log(score);
		}
		let alpha = map(this.r, 20, this.maxr, 255, 10);
		fill(255, 255, 255, alpha)
	}
}

function setup() {
	score = 0;
	counter = 0;
	spawnRate = 80;
	minSpawnRate = 30;
	maxSpawnRate = 110;
	createCanvas(windowWidth, windowHeight);
	noStroke();
	textAlign(LEFT, TOP);
	textSize(24);
	textFont('Helvetica');
}

function draw() {
	background(200, 120, 180);
	counter = (counter + 1)%spawnRate;
	if (counter === 0) {
		circles.push(new Circle());
	}
	circles.forEach((circle) => {
		circle.update();
		circle.render();
	});

	text("SCORE: ".concat(int(score).toString()), 40, 40);
}

function mousePressed() {
	if (circles	.length > 0) {
		if (dist(circles[0].x, circles[0].y, mouseX, mouseY) <= circles[0].r) {
			score += 100 - circles[0].r;
			circles.shift();
			// circles.push(new Circle());
			spawnRate = constrain(spawnRate - 5, minSpawnRate, maxSpawnRate);
		} else {
			score -= 20;
			spawnRate += 20;
		}
	}
	console.log(score);
}
