/* globals
  windowWidth, windowHeight,
  pixelDensity,
  createCanvas, resizeCanvas,
  colorMode, ellipseMode, angleMode, rectMode,
  HSL, RADIUS, RADIANS, CENTER,
  strokeWeight,
  frameCount,
  background, fill, noFill,stroke,width,height,ellipse,mouseX,mouseY,line,noCursor
  sqrt, sq, abs, PI, TAU
  rotate, translate, pop, push,
  triangle, rect, ellipse,
  canvas,*/

/* exported setup, draw, windowResized */

let goldenRatio = (1 + Math.sqrt(5)) / 2;
let gridLineThickness = 1;
let testLineThickness = 2;
let rotating = false;
let rotationAngle = 0;
let initialRotationRate = Math.PI * 2 / (60 * 15);
let rotationRate = initialRotationRate;
let colored = true;
let gridColor = 0;
let testColor = 255;
let grids = [];
let testPatterns = [];
let currentBar = 0;
let currentGrid = 0;
let gridOnTop = true;
let orientHorizontal = true;
let gridSpacing = 7;
let testSpacing = 7;

let testFunction;
let maskFunction;

const canvasSize = () => [windowWidth, windowHeight];

function setup() {
  pixelDensity(1);
  createCanvas(...canvasSize());
  noCursor();
  colorMode(HSL, 1, 1, 1, 1);
  ellipseMode(RADIUS);

  testFunction = testPatterns[0];
  maskFunction = grids[0];
}

function keyTyped() {
  if (commands.hasOwnProperty(key)) {
    commands[key].action();
  }

}

function draw() {
  background(0);
  fill(255);
  rect(0, height / 2, width, height);
  noFill();

  if (gridOnTop) {
    testFunction();
    maskFunction();
  } else {
    maskFunction();
    testFunction();
  }
  stroke(255);
  strokeWeight(1);
  textSize(12);
  let row = 14;
  for (const keybind in commands) {
    if (commands.hasOwnProperty(keybind)) {
      const helpText = commands[keybind].help;
      text(keybind + " : " + helpText, width / 2, row);
      //console.log(keybind+" : " + helpText);
      row += 14;
    }
  }
  if (rotating || mouseIsPressed) rotationAngle += rotationRate;
}

function windowResized() {
  resizeCanvas(...canvasSize());
  noCursor();
}
