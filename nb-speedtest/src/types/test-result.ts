import { Results } from '@cloudflare/speedtest'

export type TestResult =
  | { success: true; result: Results; label: string }
  | { success: false; error: Error; label: string }