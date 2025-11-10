const parseEnvNumber = (envVar: string | undefined, defaultValue: number): number => {
	if (!envVar) return defaultValue;
	const parsed = parseInt(envVar, 10);
	return isNaN(parsed) || parsed <= 0 ? defaultValue : parsed;
}

export const config = {
	// 59 min, 59 sec
	repeatIntervalSec: parseEnvNumber(import.meta.env.VITE_SPEEDTEST_REPEAT_INTERVAL, 60 * 60 - 1),
	// 30 second timeout for speedtest
	speedtestTimeoutMs: parseEnvNumber(import.meta.env.VITE_SPEEDTEST_TIMEOUT, 30000),
}
