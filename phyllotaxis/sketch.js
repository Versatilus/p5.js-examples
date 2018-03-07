/* globals
  windowWidth, windowHeight,
  pixelDensity,
  createCanvas, resizeCanvas,
  noCursor,
  colorMode, ellipseMode, angleMode, rectMode,
  HSL, RADIUS, RADIANS, CENTER,
  strokeWeight,
  frameCount,
  background, fill,
  sqrt, sq, abs
  rotate, translate, pop, push,
  triangle, rect,
  canvas */

/* exported setup, draw, windowResized
  animator, equilateral_triangle, equilateral_triangle2, cosineColors */

var petals = [];
const goldenRatio = (1 + Math.sqrt(5)) / 2;
const goldenAngle = 1 / (goldenRatio * goldenRatio) * 2 * Math.PI;
const gcr = 1 / (goldenRatio * goldenRatio);
const bgColor = [0, 0, 0, 1];
var petalShapes;

var colorScaler = Math.asin(0.5); // Starting hue.

var growthFactor = 15;
var petalRadius = goldenRatio * growthFactor;
var animating = false;
var animationRate = 300;
var spiralCount = 2;
var rotationDirection = 1; // 1 == clockwise, -1 == counterclockwise
var colorWidth = 7; // Higher is narrower.

var animator = (deflt = 0) => (animating ? frameCount / animationRate : deflt);
var goldenFilter = (breadth, magnitude, spirals) =>
  goldenAngle / (breadth + gcr * magnitude + (gcr * spirals) % 1);

const canvasSize = () => [windowWidth, windowHeight];

function setup() {
  pixelDensity(1);
  createCanvas(...canvasSize());
  noCursor();
  colorMode(HSL, 1, 1, 1, 1);
  ellipseMode(RADIUS);
  angleMode(RADIANS);
  rectMode(CENTER);
  strokeWeight(1);
  background(bgColor);

  petalShapes = [
    // [ellipse, 1, 1],
    // [equilateral_triangle, 1, PI / 6],
    // [equilateral_triangle2, 1, PI / 6],
    // [equilateral_triangle2, 1, 0],
    // [(equilateral_triangle2, 2, 0)],
    // [ellipse, 1, 1 / goldenRatio],
    // [ellipse, 1 / goldenRatio, 1],
    // [rect, 2, 2],
    [rect, 2 / goldenRatio, 2],
    [rect, 2, 2 / goldenRatio]
  ];
  petals = createSpiral(growthFactor, petalRadius);
  updater();
}

function equilateral_triangle(cx, cy, s, rotation = 0) {
  let h1 = s / 2 * Math.tan(Math.PI / 6);
  let h2 = s * Math.sin(Math.PI / 3);
  let x1 = cx - s / 2;
  let y1 = cy + h1;
  let x2 = cx;
  let y2 = cy - (h2 - h1);
  let x3 = cx + s / 2;
  let y3 = cy + h1;
  push();
  rotate(rotation / (s / 2));
  triangle(x1, y1, x2, y2, x3, y3);
  pop();
}

function equilateral_triangle2(cx, cy, s, rotation = 0) {
  let h1 = s * Math.sin(Math.PI / 6);
  let h2 = s * Math.sin(Math.PI / 3);
  let x1 = cx - h2;
  let y1 = cy + h1;
  let x2 = cx;
  let y2 = cy - s;
  let x3 = cx + h2;
  let y3 = cy + h1;
  push();
  rotate(rotation / (s / 2));
  triangle(x1, y1, x2, y2, x3, y3);
  pop();
}

// var rotator = (parameters) => {
//   let {

//     rotationAngle: phi
//   } = parameters;
//   return phi / (Math.PI * 2);
// };
var rotator = ({ rotationAngle: phi }) =>
  (-rotationDirection * phi) %
  goldenFilter(1, 0.005 * goldenRatio, spiralCount);

// var rotator = ({rotationAngle})=>rotationAngle;
//1 + (gcr * -0.005 + gcr * 1 % 1)

var sineColors = ({ rotationAngle: phi }) =>
  Math.sin(
    phi % goldenFilter(colorWidth, rotationDirection * 0.005, spiralCount) +
      colorScaler
  );

var colorizer = sineColors;

var cosineColors = ({ rotationAngle: phi }) =>
  abs(
    Math.cos(
      phi % goldenFilter(colorWidth, rotationDirection * 0.005, spiralCount) +
        colorScaler
    )
  );

// var colorLuminosity = ({
//   rotationAngle: phi
// }) => Math.abs(Math.sin((animator() + phi % (goldenFilter(1,
//   rotationDirection *
//   0.005, spiralCount)))%PI));

var colorLuminosity = () => 0.5;

var colorSaturation = () => 1;

var transparency = () => 0.75;

// {
//   x: x,
//   y: y,
//   radialDistance: r,
//   petalRadius: radius,
//   growthFactor: gf,
//   sequenceNumber: n,
//   rotationAngle: phi
// }

function Petal(options) {
  this.parameters = options;
  let { x: x, y: y, petalRadius: radius } = options;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = colorizer(options);
  this.rotation = rotator;
}

Petal.prototype.show = function() {
  push();
  //noStroke();
  translate(this.x + 0.5 * canvas.width, this.y + 0.5 * canvas.height);

  rotate(this.rotation(this.parameters));
  fill(
    this.color,
    colorSaturation(),
    colorLuminosity(this.parameters),
    transparency()
  );
  // fill(7 / 9, 1, abs(map(this.color, 0, 1, -3 / 5, 3 / 5)) + 1 / 5, 0.5);m
  for (let petalShape of petalShapes) {
    let [shapeFunction, ...rest] = petalShape;
    let parameters = [0, 0];
    for (let parameter of rest) {
      parameters.push(parameter * this.radius);
    }
    shapeFunction(...parameters);
  }
  pop();
};

function createSpiral(gf = growthFactor, radius = petalRadius) {
  var arr = [],
    as = ~~(sq(sqrt(sq(canvas.width / 2) + sq(canvas.height / 2)) / gf) + 1);
  for (let n = 0; n < as; ++n) {
    var phi = n * goldenAngle,
      r = gf * Math.sqrt(n),
      x = Math.cos(phi) * r,
      y = Math.sin(phi) * r;
    arr.push(
      new Petal({
        x: x,
        y: y,
        radialDistance: r,
        petalRadius: radius,
        growthFactor: gf,
        sequenceNumber: n,
        rotationAngle: phi
      })
    );
    // arr[n] = new Petal(x, y, radius, gf, n, phi);
    // arr[n] = new Petal(x, y, radius,
    //   abs(Math.sin(phi % (goldenAngle / colorFilter) + colorScaler)),
    //   phi);
  }
  petals = arr;
  updater();
  return arr;
}

function updater() {
  background(bgColor);
  for (var petal of petals) {
    petal.show();
  }
  // if (animating && frameCount % 120 === 0)
  //   console.log((1 + (gcr * 0.005 * (animator(5) % 10) + gcr * 1 % 1)));
}

function draw() {
  if (animating) setTimeout(updater, 0);
}

function windowResized() {
  resizeCanvas(...canvasSize());
  background(bgColor);
  petals = createSpiral(growthFactor, petalRadius);
  updater();
}
