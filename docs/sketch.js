let score;
let circle1;

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
		if (this.r == this. maxr) {
			score -= 200;
			circle1 = new Circle();
			console.log(score);
		}
		let alpha = map(this.r, 20, this.maxr, 255, 10);
		fill(255, 255, 255, alpha)
	}
}

function setup() {
	score = 0;
	createCanvas(windowWidth, windowHeight);
	noStroke();
	textAlign(LEFT, TOP);
	textSize(24);
	textFont('Helvetica');
	circle1 = new Circle();
}

function draw() {
	background(200, 120, 180);
	circle1.update();
	circle1.render();

	text("SCORE: ".concat(int(score).toString()), 40, 40);
}

function mousePressed() {
	if (dist(circle1.x, circle1.y, mouseX, mouseY) <= circle1.r) {
		score += 100 - circle1.r;
		circle1 = new Circle();
	} else {
		score -= 20;
	}
	console.log(score);
}
