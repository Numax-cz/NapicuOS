export function percentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue;
}

export function percentageValue(percentage: number, totalValue: number) {
  return (totalValue / 100) * percentage;
}
