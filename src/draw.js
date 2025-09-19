import { Angle } from './angle';
import { Circle } from './circle';
import { Coordinates } from './coordinates';

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

const radiusEl = document.getElementById('radius');
const labelsEl = document.getElementById('labels');

function fitCanvasToDPR(cvs) {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const { width, height } = cvs.getBoundingClientRect();
  cvs.width = Math.round(width * dpr);
  cvs.height = Math.round(height * dpr);
  const ctx = cvs.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

function drawSmallerCirclesAround(circle, count, delta = 10) {
  const stepAngle = 360 / count;
  const halfStepAngle = stepAngle / 2;
  const edgeCircles = [];

  const radius = circle.radius * Math.abs(Math.sin(Angle.degreeToRadians(halfStepAngle)));

  let iterativeAngle = 0;
  for (let slice = 0; slice < count; slice++) {
    const edgeCenter = new Coordinates(circle.center.x, circle.center.y)
      .cartesianRotate(radius + circle.radius + delta, iterativeAngle);

    const edgeCircle = new Circle(ctx, edgeCenter, radius);
    edgeCircle.draw();
    edgeCircles.push(edgeCircle);
    iterativeAngle += stepAngle;
  }

  return edgeCircles;
}

export function draw() {
  fitCanvasToDPR(canvas);
  const { width, height } = canvas.getBoundingClientRect();
  const cx = width / 2;
  const cy = height / 2;

  const r = Number(radiusEl.value) || 80;

  // Clear
  ctx.clearRect(0, 0, width, height);

  const center = new Coordinates(cx, cy);
  const circle = new Circle(ctx, center, r, '#fff');
  circle.draw();

  // Funnily the next set of radii is as follows
  // new Radii/old Radii = tangent(360 degrees/2 * divisions)
  // new Radii = old Radii * tangent(360 degrees/2 * divisions)
  // Funnily the new distance from center = old Radii + new Radii
  // Only the angle changes

  // 1 week has 7 days
  const days = drawSmallerCirclesAround(circle, 7, 35);

  // 1 day has 24 hours
  const hours = days.flatMap((day) => drawSmallerCirclesAround(day, 24));

  // 1 hour has 60 minutes
  // This would blow up my canvas
  // const minutes = hours.flatMap(hour => drawSmallerCirclesAround(hour, 60, 80))

  // Center dot
  // ctx.fillStyle = '#000';
  // ctx.beginPath();
  // ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  // ctx.fill();
}

['input', 'change'].forEach((ev) => {
  radiusEl.addEventListener(ev, draw);
  labelsEl.addEventListener(ev, draw);
});

window.addEventListener('resize', draw);
