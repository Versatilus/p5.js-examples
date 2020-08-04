/* globals
  currentBar, testPatterns, testFunction,
  colored, gridColor, testColor,
  
  */

/* exported commands */
let commands = {
  q: {
    action: () => {
      currentBar = (currentBar + 1) % testPatterns.length;
      testFunction = testPatterns[currentBar];
    },
    help: 'Switch test pattern.'
  },

  w: {
    action: () => {
      colored = !colored;
    },
    help: 'Toggle test pattern colors (colored or black/white).'
  },
  e: {
    action: () => {
      if (gridColor === 0) gridColor = 255;
      else gridColor = 0;
    },
    help: 'Alternate test grid shade (black/white).'
  },
  W: {
    action: () => {
      if (testColor === 0) testColor = 255;
      else testColor = 0;
    },
    help: 'Alternate test pattern shade (black/white).'
  },
  Q: {
    action: () => {
      currentGrid = (currentGrid + 1) % grids.length;
      maskFunction = grids[currentGrid];
    },
    help: 'Switch test grid (full grid/horizontal/vertical/circular/radial).'
  },
  t: {
    action: () => {
      orientHorizontal = !orientHorizontal;
      if (orientHorizontal) rotationAngle = 0;
      else rotationAngle = HALF_PI;
    },
    help: 'Orient test pattern horizontal/vertical.'
  },
  r: {
    action: () => {
      rotating = !rotating;
    },
    help: 'Toggle test pattern rotation.'
  },
  y: {
    action: () => {
      gridOnTop = !gridOnTop;
    },
    help: 'Toggle grid on top.'
  },
  R: {
    action: () => {
      rotationRate = initialRotationRate;
    },
    help: 'Reset rotation rate.'
  },
  a: {
    action: () => {
      rotationRate *= goldenRatio;
    },
    help: 'Rotate faster.'
  },
  z: {
    action: () => {
      rotationRate /= goldenRatio;
    },
    help: 'Rotate slower.'
  },
  s: {
    action: () => {
      gridSpacing *= goldenRatio;
    },
    help: 'Increase grid spacing.'
  },
  x: {
    action: () => {
      gridSpacing /= goldenRatio;
    },
    help: 'Decrease grid spacing.'
  },
  S: {
    action: () => {
      testSpacing *= goldenRatio;
    },
    help: 'Increase test spacing.'
  },
  X: {
    action: () => {
      testSpacing /= goldenRatio;
    },
    help: 'Decrease test spacing.'
  },
  d: {
    action: () => {
      gridLineThickness *= goldenRatio;
    },
    help: 'Increase grid line thickness.'
  },
  c: {
    action: () => {
      gridLineThickness /= goldenRatio;
    },
    help: 'Decrease grid line thickness.'
  },
  f: {
    action: () => {
      testLineThickness *= goldenRatio;
    },
    help: 'Increase test line thickness.'
  },
  v: {
    action: () => {
      testLineThickness /= goldenRatio;
    },
    help: 'Decrease test line thickness.'
  }
};
