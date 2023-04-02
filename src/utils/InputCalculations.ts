import NumberEntry from "../domain/NumberEntry";
import KeyPressEntry from "../domain/StringEntry";

export function countTotal(entries: KeyPressEntry[]) {
  return;
}

export function calcSpeedWithEntries(entries: KeyPressEntry[], duration: number) {
  if (entries.length < 2) {
    return 0;
  }
  
  // const duration = entries[entries.length - 1].timestamp - entries[0].timestamp;
  const speed = entries.length / duration;

  console.log(`length: ${entries.length}/duration: ${duration} = speed: ${speed * 1000}`);
  return speed * 1000; // Convert from ms to s.
}

export function calcDerivative(entries: NumberEntry[], duration: number) {
  if (entries.length < 2) {
    return 0;
  }
  const dValue = (entries[entries.length - 1].value - entries[entries.length - 2].value) / duration;

  return dValue * 1000; // Convert from ms to s.
}