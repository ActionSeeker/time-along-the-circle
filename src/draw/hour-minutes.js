import { LayeredCircleDraw } from './layered-circle-draw';

export class DrawHourMinutes extends LayeredCircleDraw {
  constructor(centerCircle) {
    super(centerCircle, [{ count: 60, gap: 50, colors: 'gradient' }]);
  }
}
