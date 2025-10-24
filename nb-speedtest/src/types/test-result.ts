import { Results } from '@cloudflare/speedtest'

export type TestResult =
  | { success: true; result: Results }
  | { success: false; error: Error }