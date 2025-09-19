/**
 * Utility class for angle conversions between degrees and radians.
 */
export class Angle {
  /**
   * Convert degrees to radians.
   *
   * @param {number} d - Angle in degrees.
   * @returns {number} Angle in radians.
   *
   * @example
   * const rad = Angle.degreeToRadians(180); // → 3.14159...
   */
  static degreeToRadians = (d) => (d * Math.PI) / 180;

  /**
   * Convert radians to degrees.
   *
   * @param {number} r - Angle in radians.
   * @returns {number} Angle in degrees.
   *
   * @example
   * const deg = Angle.radiansToDegree(Math.PI / 2); // → 90
   */
  static radiansToDegree = (r) => (r * 180) / Math.PI;
}
