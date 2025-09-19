export class LayeredCircleDraw {
  constructor(centerCircle, levels = []) {
    if (!centerCircle) throw new Error("No center circle to work with");
    this.center = centerCircle;
    this.levels = levels;
  }

  expandLevels() {
    const allCircles = [this.center];
    let currentLayer = [this.center];

    for (let level = 0; level < this.levels.length; level++) {
      const { count, gap } = this.levels[level];
      const nextLayer = [];

      for (const circle of currentLayer) {
        const kids = circle.generateOrbitingCircles(count, gap);
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
