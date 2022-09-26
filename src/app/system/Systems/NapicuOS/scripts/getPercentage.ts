export function percentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue;
}

export function percentageValue(
  percentage: number | null,
  totalValue: number
): number {
  if (percentage) return (totalValue / 100) * percentage;
  return 0;
}
