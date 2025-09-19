export class ColorMath {
  /**
   * Clamp a number to [min, max]
   * @param {number} v
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  /**
   * Convert #RGB or #RRGGBB to HSL
   * @param {string} hex
   * @returns {{h:number, s:number, l:number}}
   */
  static hexToHsl(hex) {
    if (typeof hex !== 'string' || !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
      throw new Error('hexToHsl: invalid hex string');
    }

    const norm = hex.toLowerCase();
    const isShort = norm.length === 4;

    const rHex = isShort ? norm[1] + norm[1] : norm.slice(1, 3);
    const gHex = isShort ? norm[2] + norm[2] : norm.slice(3, 5);
    const bHex = isShort ? norm[3] + norm[3] : norm.slice(5, 7);

    const r = parseInt(rHex, 16) / 255;
    const g = parseInt(gHex, 16) / 255;
    const b = parseInt(bHex, 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    const d = max - min;
    let h = 0;
    let s = 0;

    if (d !== 0) {
      s = d / (1 - Math.abs(2 * l - 1));
      switch (max) {
        case r:
          h = ((g - b) / d) % 6;
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        // no default
      }
      h *= 60;
      if (h < 0) h += 360;
    }

    return { h: Math.round(h), s: s * 100, l: l * 100 };
  }

  /**
   * Convert HSL to #RRGGBB
   * @param {number} h 0–360
   * @param {number} s 0–100
   * @param {number} l 0–100
   * @returns {string}
   */
  static hslToHex(h, s, l) {
    // normalize & clamp
    const hh = ((h % 360) + 360) % 360;
    const ss = ColorMath.clamp(s, 0, 100) / 100;
    const ll = ColorMath.clamp(l, 0, 100) / 100;

    const k = (n) => (n + hh / 30) % 12;
    const a = ss * Math.min(ll, 1 - ll);
    const f = (n) => {
      const c = ll - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return Math.round(255 * c)
        .toString(16)
        .padStart(2, '0');
    };

    return `#${f(0)}${f(8)}${f(4)}`;
  }

  /**
   * Smooth easing for lightness spacing
   * @param {number} t 0..1
   * @returns {number}
   */
  static ease(t) {
    return 0.5 - 0.5 * Math.cos(Math.PI * t);
  }

  /**
   * Generate N hex colors (tints/shades) from a base hex.
   * @param {string} baseHex
   * @param {number} n
   * @param {{Lmin:number, Lmax:number, Smin:number, Smax:number}} opts
   * @returns {string[]}
   */
  static makeHexShades(
    baseHex,
    n = 24,
    {
      Lmin = 35, Lmax = 78, Smin = 55, Smax = 78,
    } = {},
  ) {
    if (!Number.isInteger(n) || n <= 0) {
      throw new Error('makeHexShades: n must be a positive integer');
    }

    const { h, s: Sbase } = ColorMath.hexToHsl(baseHex);
    const colors = new Array(n);

    for (let i = 0; i < n; i += 1) {
      const t = ColorMath.ease(i / (n - 1)); // 0..1 eased
      const L = Lmin + (Lmax - Lmin) * t; // tasteful lightness band
      const Smid = Smin + (Smax - Smin) * (1 - Math.abs(0.5 - t) * 2); // higher in mids
      const S = Math.min(Smid, Sbase || Smax);
      colors[i] = ColorMath.hslToHex(h, S, L);
    }

    return colors;
  }
}
