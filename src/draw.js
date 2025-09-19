import { DrawHourMinutes } from './draw/hour-minutes';
import { DrawWeekDayHour } from './draw/week-day-hour';
import { DrawYearMonths } from './draw/year-months';
import { Circle } from './geometry/circle';
import { Coordinates } from './geometry/coordinates';

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

const radiusEl = document.getElementById('radius');

function fitCanvasToDPR(cvs) {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const { width, height } = cvs.getBoundingClientRect();
  cvs.width = Math.round(width * dpr); // eslint-disable-line no-param-reassign
  cvs.height = Math.round(height * dpr); // eslint-disable-line no-param-reassign
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

export function draw() {
  fitCanvasToDPR(canvas);
  const { width, height } = canvas.getBoundingClientRect();
  const cx = width / 2;
  const cy = height / 2;

  const r = Number(radiusEl.value) || 80;
  ctx.clearRect(0, 0, width, height);

  new DrawHourMinutes(
    new Circle(ctx, new Coordinates(cx, cy), r, '#CCDCEB')
  ).draw();

  new DrawWeekDayHour(
    new Circle(ctx, new Coordinates(cx, cy), r, '#CCDCEB')
  ).draw();

  new DrawYearMonths(
    new Circle(ctx, new Coordinates(cx, cy), r, '#CCDCEB')
  ).draw();
}

['input', 'change'].forEach((ev) => {
  radiusEl.addEventListener(ev, draw);
});

window.addEventListener('resize', draw);
