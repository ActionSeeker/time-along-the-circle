import { LayeredCircleDraw } from './layered-circle-draw';

export class DrawWeekDayHour extends LayeredCircleDraw {
  constructor(centerCircle) {
    super(centerCircle, [
      { count: 7, gap: 30 },
      { count: 24, gap: 5 },
    ]);
  }
}
