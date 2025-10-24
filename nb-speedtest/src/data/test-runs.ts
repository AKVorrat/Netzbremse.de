import { ConfigOptions } from "@cloudflare/speedtest";
import { shuffleArray } from "../util/arrays";

export type TestRun = {
	label: string,
	config: ConfigOptions,
}

export function getTestRuns(sessionID: string): TestRun[] {
	const data = [
		{ label: "Route A", uri: "https://custom-t0.speed.cloudflare.com" },
		//{ label: "Route A", uri: "https://custom-t1.speed.cloudflare.com" },
		{ label: "Route B", uri: "https://custom-t1.speed.cloudflare.com" },
		{ label: "Route C", uri: "https://custom-t2.speed.cloudflare.com" },
		{ label: "Route D", uri: "https://custom-t3.speed.cloudflare.com" },
		{ label: "Route E", uri: "https://custom-t4.speed.cloudflare.com" },
	]

	const runs = data.map((d): TestRun => ({
		label: d.label,
		config: {
			downloadApiUrl: `${d.uri}/__down`,
			uploadApiUrl: `${d.uri}/__up`,
			// @ts-ignore
			sessionId: sessionID,
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

	return shuffleArray(runs)
}

