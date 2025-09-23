export const formatSpeed = (speed: number): string =>
  speed ? (speed / 1e6).toLocaleString('de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }) : '0';

export const formatLatency = (latency: number): string =>
  latency?.toLocaleString('de-DE', { maximumFractionDigits: 0 }) || '0';