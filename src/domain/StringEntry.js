/**
 * Represents a string value with an associated timestamp.
 */
export default class StringEntry {
  value;
  timestamp;

  constructor(value, timestamp) {
    this.value = value;
    this.timestamp = timestamp;
  }
}