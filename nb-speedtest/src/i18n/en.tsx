import { Show } from "solid-js";

export const en = {
	title: "What, how, why?",
	description: [
		"With this speed test, you can check whether your internet connection is affected by bottlenecks at the entry point to your provider's network that could slow down certain websites and services. By doing so, you help the Netzbremse campaign to better document the problem with data. The test takes longer because 5 speed tests are performed consecutively.",
		() => (<>
			Important: Please <strong>disable your adblocker for this page</strong>. This is the only way we can collect and analyze your anonymized test results. Thank you!
		</>),
		"Tests in the evening and on weekends are particularly meaningful, as problems occur especially frequently at these times.",
	],
	speedtest: {
		title: "Speed Test",
		startBtn: "Start",
		runInBackground: "Repeat test in background",
		stepN: (n: number) => `Step ${n}`,
		pause: "Pause",
		resume: "Resume",
		download: "Download",
		upload: "Upload",
		route: (letter: string) => `Route ${letter}`,
		testing: (name: string) => `Testing ${name}`,
		latencyDuringDownload: (latency: string, jitter: string) => <>
			<span class="inline-block min-w-[4ch] text-end">{latency}</span> ms Latency during download
			<Show when={jitter}> (±{jitter} ms)</Show>
		</>,
		latencyDuringUpload: (latency: string, jitter: string) => <>
			<span class="inline-block min-w-[4ch] text-end">{latency}</span> ms Latency during upload
			<Show when={jitter}> (±{jitter} ms)</Show>
		</>,
		restart: "Restart",
		error: "Error",
		subtitle: "Netzbremse x Cloudflare",
		unknownError: "Unknown error",
		loggingBlocked: {
			title: "Data cannot be transmitted",
			message: "For the Netzbremse campaign, we collect anonymous test results. Data transmission seems to be blocked (possibly by an adblocker). You can still run the test. If you want to help the campaign, please disable the adblocker for this page and restart the test.",
			dismiss: "Understood",
		},
	},
	advancedResults: {
		title: "Detailed Test Results",
		overview: "Overview",
		routesTested: (count: number) => `${count} routes tested`,
		testCompleted: "Test completed",
		sessionId: "Session ID",
		exportData: "Export data",
		rawMetrics: "Measurements",
		performanceData: "Performance data",
		downloadSpeed: "Download speed",
		uploadSpeed: "Upload speed",
		loadedLatencyDown: "Latency under load (Download)",
		loadedLatencyUp: "Latency under load (Upload)",
		noLatencyData: "No latency data available",
		idleLatency: "Idle latency",
		jitter: "Jitter",
		server: "Server",
		testDuration: "Test duration",
		seconds: "seconds",
		mbps: "Mbps",
		ms: "ms",
		download: "Download",
		upload: "Upload",
		latency: "Latency",
		timeSeconds: "Time (seconds)",
		speedMbps: "Speed (Mbps)",
		latencyMs: "Latency (ms)",
		stats: {
			min: "Min",
			max: "Max",
			median: "Median",
			average: "Average",
		},
		chart: {
			noDataAvailable: (type: string) => `No ${type} data available`,
		},
	},
	faqTitle: "Background on the Speed Test",
	faq: [
		{
			title: "Why should I disable my adblocker?",
			body: () => (<>
				<p>
					We collect the anonymized measurement results from your browser via Cloudflare endpoints. This interface
					is also used by advertising networks and is therefore often blocked by ad blockers. The test works fine with an adblocker,
					but your results won't be reported back to us and won't help the campaign.
				</p>
			</>),
		},
		{
			title: "Why does the test take so long?",
			body: () => (<>
				<p>
					This test measures bottlenecks between different parts of the Internet (so-called transit providers) and your
					internet connection. Unlike other speed tests, we don't measure the connection from your connection to other parts
					of the network, but in the opposite direction from the Internet to your Internet provider and your connection.
				</p>
				<p>
					The test measures different connections (transit providers) one after another. That's why it takes longer than normal
					speed tests. Please let the test run to completion anyway to get meaningful results.
				</p>
			</>),
		},
		{
			title: "Why can I run this test in the background?",
			body: () => (<>
				<p>
					If you activate the checkbox below the test button, we will repeat the test until you leave this page.
					All transit operators are tested one after another repeatedly and a new test series is created each time.
				</p>
				<p>
					You help us collect more data and thus make more reliable statements.
				</p>
			</>),
		},
		{
			title: "Can I do other things while the test is running?",
			body: "While the test is running, you should not run bandwidth-intensive applications such as video streaming or file sharing over the same internet connection. Computationally intensive tasks on the same device could also distort the test. Ideally, let the test run on your browser while you're not using the computer.",
		},
		{
			title: "How can I get the most accurate test results?",
			body: () => (<>
				<p>
					If possible, run the speed test with a stable connection - ideally with a computer that is directly connected to the router via LAN cable.
				</p>
				<p>
					If you run the test via WiFi, make sure that your device is in the immediate vicinity of the router and that no obstacles (e.g. walls) are interfering with the connection.
				</p>
				<p>
					This ensures that any speed losses are actually due to the internet connection and are not caused by your home network.
				</p>
			</>),
		},
		{
			title: "What is your privacy policy?",
			body: () => (<>
				<p>
					Tl;dr: we don't store any personal data. We cannot and do not want to find out who you are.
					Your participation in the test remains anonymous.
				</p>
				<p>
					This test only stores the network part of your IP address, but not your specific connection identifier.
					For IPv4 addresses, we only store the first three number blocks (octets).
				</p>
				<p>
					When you perform a network measurement, all associated measurements are stored together in the data pool.
					This allows us to recognize that these measurements were performed from the same connection without being able to
					identify your connection.
				</p>
				<p>
					For all other functions of the website, we refer to the general
					<a href="https://epicenter.works/datenschutz" target="_blank">privacy policy</a> of epicenter.works.
				</p>
			</>),
		},
		{
			title: "How does a VPN affect the measurement?",
			body: () => (<>
				<p>
					Please run the test without a VPN. This is the only way we can uncover and address issues.
				</p>
				<p>
					VPNs can have massive effects on the results of the network measurement. Because a VPN routes all your internet traffic
					through a different route, potential bottlenecks between your internet provider and transit operators are bypassed.<br />
					A VPN can therefore be a good way to solve the problem in everyday life. Therefore, a VPN prevents a meaningful measurement of the problem.
				</p>
			</>),
		},
		{
			title: "Why are you working with Cloudflare?",
			body: () => (<>
				The Netzbremse campaign is supported by civil society. Without Cloudflare's support, we would not have the technical capabilities to provide such a complex measurement tool. Like many other network and website operators, Cloudflare has already <a href="https://blog.cloudflare.com/eu-network-usage-fees/" target="_blank">taken a position on the Netzbremse issue</a>.
			</>),
		},
		{
			title: "What happens with the measurement results?",
			body: "We first need to collect sufficient data to enable meaningful statistical analysis. Only with enough data can we make reliable statements. As part of this analysis, we will also hand over the data to the Federal Network Agency so that they can independently verify our results.",
		},
	]
}
