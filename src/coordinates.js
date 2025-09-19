export class Coordinates {
  constructor(x, y) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    return this;
  }

  cartesianRotate(distance, angle) {
    const angleInRadians = angle * Math.PI / 180;
    const xCoord = this.x + distance * Math.sin(angleInRadians);
    const yCoord = this.y + distance * Math.cos(angleInRadians);
    return new Coordinates(xCoord, yCoord);
  }
}
