import { LayeredCircleDraw } from './layered-circle-draw';

export class DrawWeekDayHour extends LayeredCircleDraw {
  constructor(centerCircle) {
    super(centerCircle, [
      {
        count: 7,
        gap: 35,
        colors: [
          '#5e4fa2', // muted purple
          '#7b5db8', // soft violet
          '#4a6fdc', // calm blue
          '#3ba27a', // jade / mint green
          '#d4b843', // warm muted yellow-gold
          '#e67e3c', // softer orange
          '#d95f5f', // coral-rose
        ],
      },
      { count: 24, gap: 8, colors: 'gradient' },
    ]);
  }
}
