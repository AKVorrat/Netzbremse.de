import { Results } from '@cloudflare/speedtest'

export interface TestResult {
  label: string;
  success: boolean;
  result?: Results;
  error?: Error;
}
