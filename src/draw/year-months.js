import { LayeredCircleDraw } from './layered-circle-draw';

export class DrawYearMonths extends LayeredCircleDraw {
  constructor(centerCircle) {
    super(centerCircle, [
      {
        count: 12,
        gap: 35,
        colors: [
          '#7ED957', // Bright Green, Early Summer
          '#E67E22', // Burnt Orange, Peak Summer
          '#2C3E50', // Dark Blue, Rainy Season
          '#FFBF00', // Amber, Autumn
          '#AED6F1', // Pale blue, Early Winter
          '#5DADE2', // Icy Blue, Late Winter
        ].flatMap((color) => [color, color]),
      },
    ]);
  }
}
