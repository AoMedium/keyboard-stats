export default class KeyPressEntry {
  value: string;
  timestamp: number;

  constructor(value: string, timestamp: number) {
    this.value = value;
    this.timestamp = timestamp;
  }
}