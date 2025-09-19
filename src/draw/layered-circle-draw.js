import { ColorMath } from '../color/color-math';

export class LayeredCircleDraw {
  constructor(centerCircle, levels = []) {
    if (!centerCircle) throw new Error('No center circle to work with');
    this.center = centerCircle;
    this.levels = levels;
  }

  static setColours(parent, kids, colors) {
    const palette = colors === 'gradient'
      ? ColorMath.makeHexShades(parent.getFillStyle(), 200)
      : colors;
    kids.forEach((kid, $idx) => kid.setFillStyle(palette[$idx]));
  }

  expandLevels() {
    const allCircles = [this.center];
    let currentLayer = [this.center];

    for (let level = 0; level < this.levels.length; level++) {
      const { count, gap, colors } = this.levels[level];
      const nextLayer = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const circle of currentLayer) {
        const kids = circle.generateOrbitingCircles(count, gap);
        LayeredCircleDraw.setColours(circle, kids, colors);
        allCircles.push(...kids);
        nextLayer.push(...kids);
      }

      currentLayer = nextLayer;
    }

    return allCircles;
  }

  draw() {
    const allCircles = this.expandLevels();
    allCircles.forEach((c) => c.draw());
  }
}
