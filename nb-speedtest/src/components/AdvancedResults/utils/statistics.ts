export type StatisticalSummary = {
  min: number;
  max: number;
  mean: number;
  median: number;
  count: number;
};

export const calculateStats = (values: number[] | undefined): StatisticalSummary | null => {
  if (!values || values.length === 0) return null;

  const sorted = [...values].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;

  // Calculate median
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];

  return { min, max, mean, median, count: values.length };
};