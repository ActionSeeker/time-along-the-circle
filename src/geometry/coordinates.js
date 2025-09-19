/**
 * 2D Cartesian coordinate with helper for polar offsets.
 */
export class Coordinates {
  constructor(x, y) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  /**
   * Return a new point offset from this one using polar coordinates.
   *
   * Conventions (mathematical Cartesian plane):
   * - Input angle in **degrees**.
   * - 0° points along the +X axis (to the right).
   * - Angles increase **anticlockwise** (90° = up).
   *
   * Formulas:
   *   θ = angleDeg × π / 180
   *   x' = x + distance · cos(θ)
   *   y' = y + distance · sin(θ)
   *
   * @param {number} distance – radial distance
   * @param {number} angleDeg – angle in degrees (0° = right, CCW positive)
   * @returns {Coordinates} new Coordinates instance
   */
  polarOffset(distance, angleDeg) {
    const θ = (angleDeg * Math.PI) / 180;
    const x = this.x + distance * Math.cos(θ);
    const y = this.y + distance * Math.sin(θ);
    return new Coordinates(x, y);
  }
}
