// Box-Muller Transform is used to derive a single value pulled from a normal distribution
export function normDist(mean: number, standardDeviation: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * standardDeviation + mean;
}

// upper and lower bounds are inclusive
export function boundedNormDist(
  mean: number,
  standardDeviation: number,
  lowerBound: number,
  upperBound: number
): number {
  let value = normDist(mean, standardDeviation);
  while (value <= lowerBound || value >= upperBound) {
    value = normDist(mean, standardDeviation);
  }
  return value;
}

export function roundToChosenDecimal(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
