/**
 * Represents a numeric value with an associated timestamp.
 */
export default class NumberEntry {
  value;
  timestamp;

  constructor(value, timestamp) {
    this.value = value;
    this.timestamp = timestamp;
  }
}