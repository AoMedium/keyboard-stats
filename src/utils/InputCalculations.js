/**
 * 
 * @param {*} entries - List of timestamped entries.
 * @param {*} duration - Duration at which the entries were recorded
 * @returns 
 */
export function calcDerivative(entries, duration) {
  if (entries.length < 2) {
    return 0;
  }
  const derivative = (entries[entries.length - 1].value - entries[entries.length - 2].value) / duration;

  return derivative * 1000; // Convert from ms to s.
}