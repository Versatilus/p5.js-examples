testPatterns.push(options => {
  push();
  let radius = 0.3333 * (height > width ? width : height) * .5;
  let spokes = ~~(radius * Math.PI * 2 / (testSpacing * goldenRatio));
  strokeWeight(testLineThickness);
  let rotation = TAU / spokes;
  for (let i = 0; i < spokes; i++) {
    if (colored) stroke(i / spokes, 1, 0.5);
    else stroke(testColor);
    line(
      mouseX,
      mouseY,
      mouseX + radius * cos(rotation * i + rotationAngle),
      mouseY + radius * sin(rotation * i + rotationAngle)
    );
  }
  pop();
});

testPatterns.push(options => {
  let lineLength = 0.3333 * (height > width ? width : height);
  strokeWeight(testLineThickness);
  let lineCount = lineLength * 0.618 / testSpacing;
  push();
  translate(mouseX, mouseY);
  rotate(rotationAngle);
  for (let i = 0; i < lineCount; i++) {
    if (colored) stroke(i / lineCount, 1, 0.5);
    else stroke(testColor);
    line(
      -lineLength * 0.5,
      (i - lineCount * 0.5) * testSpacing,
      lineLength * 0.5,
      (i - lineCount * 0.5) * testSpacing
    );
  }
  pop();
});

testPatterns.push(options => {
  push();
  noFill();
  let maxRadius = 0.3333 * (height > width ? width : height) / 2;
  strokeWeight(testLineThickness);
  let loopPercentage = (rotationAngle % TAU) / TAU;
  let lineCount = ~~(maxRadius / (testSpacing + testLineThickness));
  for (let i = 0; i < lineCount; i++) {
    let radius =
      (i * (testSpacing + testLineThickness) + maxRadius * loopPercentage) %
      (lineCount * (testSpacing + testLineThickness));
    if (colored) stroke(i / lineCount, 1, .5, 1 - radius / maxRadius * .5);
    else stroke(testColor, 1 - radius / maxRadius * .5);
    ellipse(mouseX, mouseY, radius);
  }
  pop();
});
