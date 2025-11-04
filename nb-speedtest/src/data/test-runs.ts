import { ConfigOptions } from "@cloudflare/speedtest";
import { shuffleArray } from "../util/arrays";
import { useTranslation } from "../i18n/context";

const alphabet = ['A', 'B', 'C', 'D', 'E']

export type TestRun = {
	label: string,
	config: ConfigOptions,
}

export function getTestRuns(sessionID: string): TestRun[] {
	const { t } = useTranslation();
	const data = [
		{ label: undefined, uri: "https://custom-t0.speed.cloudflare.com" },
		{ label: undefined, uri: "https://custom-t1.speed.cloudflare.com" },
		{ label: undefined, uri: "https://custom-t2.speed.cloudflare.com" },
		{ label: undefined, uri: "https://custom-t3.speed.cloudflare.com" },
		{ label: undefined, uri: "https://custom-t4.speed.cloudflare.com" },
	]

	let runs = data.map((d, i): TestRun => ({
		label: d.label,
		config: {
			downloadApiUrl: `${d.uri}/__down`,
			uploadApiUrl: `${d.uri}/__up`,
			// @ts-ignore
			sessionId: `session=${sessionID}&target=${new URL(d.uri).hostname.split('.')[0]}`,
			turnServerCredsApiUrl: `${d.uri}/__turn`,
			turnServerUri: "turn.cloudflare.com:3478",
			includeCredentials: false,
			measurements: [
				{ type: "download", bytes: 1e5, count: 2 },
				{ type: "upload", bytes: 1e5, count: 2 },
				{ type: "download", bytes: 1e7, count: 2 },
				{ type: "upload", bytes: 1e7, count: 2 },
				{ type: "download", bytes: 2.5e7, count: 2 },
				{ type: "upload", bytes: 2.5e7, count: 2 },
				{ type: "latency", numPackets: 20 },
			],
		}
	}))

	runs = shuffleArray(runs)

	for (const [index, run] of runs.entries()) {
		const letter = alphabet[index % alphabet.length]
		run.label = t.speedtest.route(letter, run.label)
	}

	return runs
}

