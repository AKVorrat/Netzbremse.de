export function formatLatencyDisplay(latency: number | undefined | null): string {
  if (!latency || latency <= 0) {
    return '-'
  }
  return latency.toLocaleString(undefined, { maximumFractionDigits: 0 })
}