export function parseEnvBoolean(value: string | undefined): boolean {
  if (!value) return false

  const normalized = value.toLowerCase()
  return normalized === 'true' || normalized === '1'
}