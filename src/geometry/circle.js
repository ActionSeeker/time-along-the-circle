import { Angle } from "./angle";
import { Coordinates } from "./coordinates";

export class Circle {
  constructor(ctx, center, radius, color) {
    this.ctx = ctx;
    this.center = new Coordinates(center.x, center.y);
    this.radius = radius;
    this.color = color || "#000";
  }

  draw() {
    const { ctx, center, radius, color } = this;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  }

  /**
   * Generate child circles around this circle.
   * @param {number} childCount - number of circles to create
   * @param {number} gap - distance between parent and children
   * @returns {Circle[]} array of child circles
   */
  generateOrbitingCircles(childCount, gap = 10) {
    const angleStep = 360 / childCount;
    const halfAngleStep = angleStep / 2;
    const children = [];

    const childRadius =
      this.radius * Math.abs(Math.sin(Angle.degreeToRadians(halfAngleStep)));

    let currentAngle = 0;
    for (let i = 0; i < childCount; i++) {
      let childCenter = new Coordinates(this.center.x, this.center.y);
      childCenter = childCenter.polarOffset(
        childRadius + this.radius + gap,
        currentAngle
      );
      children.push(new Circle(this.ctx, childCenter, childRadius));
      currentAngle += angleStep;
    }

    return children;
  }
}
