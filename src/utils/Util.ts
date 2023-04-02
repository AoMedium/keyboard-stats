export function sumMap(map: Map<any, number>) {
  let sum = 0;

  map.forEach((value, key) => {
    sum += value;
  });

  return sum;
}