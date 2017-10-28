var offscreenBuffer;
var hypnotizers = [];

const rotationPerFrame = (2 * Math.PI) / (60 * 3); //(full circle) / (frame rate * time)


const canvasSize = [640, 360];

function setup() {
  let [xSize, ySize] = canvasSize; // destructured assignment https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/
  createCanvas(xSize, ySize);
  offscreenBuffer = createGraphics(xSize, ySize); // https://p5js.org/reference/#/p5/createGraphics

  // modes are set directly on the 'renderer' object/'drawing surface'
  offscreenBuffer.background(51);
  offscreenBuffer.stroke(0);
  offscreenBuffer.colorMode(HSL, 1, 1, 1, 1); // I prefer the maths of this color mode
  offscreenBuffer.rectMode(CENTER);

  ellipseMode(RADIUS); // the main canvas is still separate

  noCursor();

  // just something to fill the canvas for demonstration
  let totalSpinners = ~~random(10) + 1; // double bitwise NOT is faster than floor()
  for (let i = 0; i < totalSpinners; i++) {
    hypnotizers.push(
      new HypnoSquare(
        random(offscreenBuffer.width),
        random(offscreenBuffer.height),
        random(13, 29)));
  }
}

function draw() {
  background(0);

  // arrays are iterators https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/
  for (let hypnotizer of hypnotizers) {
    hypnotizer.move();
    hypnotizer.show();
  }

  image(offscreenBuffer, 0, 0); // treat the drawing buffer like an image

  fill(0, 204);
  stroke(1);
  ellipse(mouseX, mouseY, 11); // our cursor is independent of our picture
}

class HypnoSquare {
  constructor(sx, sy, size) {
    this.position = createVector(sx, sy);
    this.size = size;
    this.topSpeed = size * 0.55;
    this.velocity = createVector(random(-this.topSpeed, this.topSpeed),
      random(-this.topSpeed, this.topSpeed));
  }

  // all drawing is done with methods of our 'drawing surface'
  show() {
    offscreenBuffer.fill(
      sin(frameCount * rotationPerFrame * 0.1 + this.size) ** 2, // ES7 adds exponentiation https://hacks.mozilla.org/2015/08/es6-in-depth-the-future/
      1,
      0.5,
      0.333);

    offscreenBuffer.push();
    offscreenBuffer.translate(
      this.position.x,
      this.position.y);
    offscreenBuffer.rotate(rotationPerFrame * frameCount);
    offscreenBuffer.rect(0, 0, this.size, this.size);
    offscreenBuffer.pop();
  }

  // JFM
  move() {
    this.position.add(this.velocity);

    if (this.position.x < 0 || offscreenBuffer.width < this.position.x) {
      this.velocity = createVector(
        this.velocity.x / abs(this.velocity.x) * -random(this.topSpeed),
        random(-this.topSpeed, this.topSpeed));
      this.position.x = constrain(this.position.x, 0, offscreenBuffer.width);
    }
    if (this.position.y < 0 || offscreenBuffer.height < this.position.y) {
      this.velocity = createVector(
        random(-this.topSpeed, this.topSpeed),
        this.velocity.y / abs(this.velocity.y) * -random(this.topSpeed));
      this.position.y = constrain(this.position.y, 0, offscreenBuffer.height);
    }
  }

}
