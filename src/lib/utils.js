/**
 * Set of function that I find useful for explorations.
 */

 /**
  * Performs hermit interpolation of `x` between two edges
  */
export function smoothStep(edge0, edge1, x) {
  let t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

/**
 * Clamp `x` to [min, max] range.
 */
export function clamp(x, min, max) {
  return x < min ? min : x > max ? max : x;
}