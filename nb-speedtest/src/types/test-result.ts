import { Results } from '@cloudflare/speedtest'
import { SpeedtestError } from './speedtest-error'

export interface TestResult {
  label: string;
  success: boolean;
  result?: Results;
  error?: SpeedtestError;
}
