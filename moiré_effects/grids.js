grids.push(() => {
  stroke(gridColor);
  strokeWeight(gridLineThickness);
  for (let i = 0; i < height / gridSpacing; i++)
    line(0, gridSpacing * i, width / 2, gridSpacing * i);
  for (let i = width / gridSpacing / 2; i >= 0; i--)
    line(gridSpacing * i, 0, gridSpacing * i, height);
});

grids.push(() => {
  stroke(gridColor);
  strokeWeight(gridLineThickness);
  for (let i = 0; i < height / gridSpacing; i++)
    line(0, gridSpacing * i, width / 2, gridSpacing * i);
});

grids.push(() => {
  stroke(gridColor);
  strokeWeight(gridLineThickness);
  for (let i = width / gridSpacing / 2; i >= 0; i--)
    line(gridSpacing * i, 0, gridSpacing * i, height);
});

grids.push(() => {
  stroke(gridColor);
  strokeWeight(gridLineThickness);
  let radius = (height < width ? width : height);
  for (let i = 0; i < radius / gridSpacing; i++)
    arc(width / 2, height / 2, gridSpacing * i, gridSpacing * i, PI / 2, 3 * PI / 2);
});

grids.push(() => {
  push();
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = (height < width ? width : height);
  let spokes = ~~((0.3333 * (height > width ? width : height) * .5) * Math.PI * 2 / (gridSpacing * goldenRatio));
  stroke(gridColor);
  strokeWeight(gridLineThickness);
  let rotation = TAU / spokes;
  for (let i = 0; i < spokes; i++) {
    let targetX = centerX + radius * cos(HALF_PI + rotation * i);
    let targetY = centerY + radius * sin(HALF_PI + rotation * i);
    if (targetX <= centerX)
      line(
        centerX,
        centerY,
        targetX,
        targetY
      );
  }
  pop();
});
