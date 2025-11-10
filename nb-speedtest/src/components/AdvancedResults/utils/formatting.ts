export const formatSpeed = (speed: number): string =>
  speed ? (speed / 1e6).toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }) : '-';
