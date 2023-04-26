/**
 * Sums the numeric values of a map.
 */
export function sumMap(map) {
  let sum = 0;

  map.forEach((value, key) => {
    sum += value;
  });

  return sum;
}

/**
 * Generates a number of given points within a given range.
 * @param {} lower - Lower bound (inclusive)
 * @param {*} upper - Upper bound (inclusive)
 * @param {*} count - Number of points to generate
 */
export function generatePoints(lower, upper, count) {
  const points = [];

  for (let i = 0; i < count; i++) {
    points.push(generatePoint(lower, upper));
  }
  return points;
}

/**
 * Generates a single point within a given range.
 * @param {} lower - Lower bound (inclusive)
 * @param {*} upper - Upper bound (inclusive)
 */
export function generatePoint(lower, upper) {
  const range = upper - lower;
  
  return Math.random() * range + lower;
}