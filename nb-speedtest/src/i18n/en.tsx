import { Show } from "solid-js";

export const en = {
	title: "What, how, why?",
	description: [
		"With this speedtest, you can check whether your internet connection is being slowed down by bottlenecks at the point where it connects to your provider’s network. This can affect certain websites and online services. By running the test, you help the Netzbremse campaign collect data that makes the issue more visible. The test takes a little longer because it runs 5 speedtests in a row.",
		() => (<>
			Important: Please <strong>disable your ad blocker for this page</strong>. Only then can we collect and analyze your anonymized test results. Thank you!
		</>),
		"Tests in the evening and on weekends are especially useful, as that’s when performance problems occur most frequently.",
	],
	speedtest: {
		title: "Speedtest",
		startBtn: "Start",
		runInBackground: "Repeat test in the background",
		stepN: (n: number) => `Step ${n}`,
		pause: "Pause",
		resume: "Resume",
		download: "Download",
		upload: "Upload",
		route: (letter: string, label?: string) => label ? `Route ${letter} (${label})` : `Route ${letter}`,
		testing: (name: string) => `Testing ${name}`,
		latencyDuringDownload: (latency: string, jitter: string) => <>
			<span class="inline-block min-w-[3ch] text-end">{latency}</span> ms latency while downloading
			<Show when={jitter}> (±{jitter} ms)</Show>
		</>,
		latencyDuringUpload: (latency: string, jitter: string) => <>
			<span class="inline-block min-w-[3ch] text-end">{latency}</span> ms latency while uploading
			<Show when={jitter}> (±{jitter} ms)</Show>
		</>,
		idleLatencyDisplay: (latency: string, jitter: string) => <>
			Idle latency: <span class="inline-block min-w-[3ch] text-end">{latency}</span>&nbsp;ms | Jitter: <span class="inline-block min-w-[3ch] text-end">{jitter}</span>&nbsp;ms
		</>,
		restart: "Restart",
		error: "Error",
		subtitle: "Netzbremse x Cloudflare",
		testsCompleted: (count: number) => `${count} tests completed`,
		restartIn: "Restart in",
		unknownError: "Unknown error",
		loggingBlocked: {
			title: "Data cannot be transmitted",
			message: "We collect anonymous test data for the Netzbremse campaign. It looks like data transmission is being blocked (likely by an ad blocker). You can still run the test, but if you want to support the campaign, please disable the ad blocker for this page, reload and restart the test.",
			dismiss: "Understood",
		},
		peakHoursInfo: () => <>
			<strong>Note:</strong> Measurements taken during <a href="https://radar.cloudflare.com/traffic/de" target="_blank">peak hours</a> (e.g. in the evening) are especially helpful for us.
		</>
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
		loadedLatencyDown: "Latency under load (download)",
		loadedLatencyUp: "Latency under load (upload)",
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
	privacyPolicy: {
		title: "Privacy Policy",
		content: () => (
			<p>
				When you run Speed Test, your IP address will be shared with Cloudflare and processed in accordance with our <a href="https://www.cloudflare.com/privacypolicy/" target="_blank">privacy policy</a>.
			</p>
		),
		summary: "Learn More",
		details: () => (<>
			<p>
				When you use Speed Test, Cloudflare receives the IP address you use to connect to Cloudflare's Speed Test service. Cloudflare uses your IP address to estimate your geolocation (at the country and city levels) and to identify the Autonomous System Number (ASN) associated with your IP address.
			</p>
			<p>
				Cloudflare will share anonymized measurement information (e.g., the estimated geolocation, ASN associated with your Speed Test, etc.) along with your truncated IP address with our measurement partners, including Epicenter Works, as part of Cloudflare’s contribution to a shared Ixnternet performance database. We do not share your full IP address with our measurement partners. Once our analysis is complete, such measurement information and truncated IP addresses will also be published to Measurement Lab’s public BigQuery database.
			</p>
			<p>
				As a part of this Speed Test, Cloudflare receives the following information:
			</p>
			<ul>
				<li>Your IP address;</li>
				<li>An estimate of your location (Country, City);</li>
				<li>The Autonomous System Number of your ISP (ASN).</li>
			</ul>
			<p>
				Cloudflare truncates your IP address that it receives as part of your use of the Speed Test to /24 and /48 for IPv4 and IPv6 addresses, respectively.
			</p>
		</>),
		acceptButton: "Accept and Start Test",
		dataUsageNote: "Note: A speed test can consume up to 200MB of data.",
	},
	faqTitle: "Background on the Speedtest",
	faq: [
		{
			title: "Why should I disable my ad blocker?",
			body: () => (<>
				<p>
					We collect anonymized measurement data from your browser using Cloudflare endpoints. Even though these endpoints are anonymized and perform no tracking, they are often blocked by ad blockers. The speedtest itself will still work, but your results will not be sent to us and therefore won’t support the campaign.
				</p>
			</>),
		},
		{
			title: "Why does the test take so long? How does it work?",
			body: () => (<>
				<p>
					This test identifies bottlenecks between different parts of the internet (so-called transit providers) and your internet connection. Unlike most speedtests, we don’t measure from your device outward — we measure in the opposite direction: from the internet toward your provider and finally to your connection.
				</p>
				<p>
					Each transit provider is tested one after another, which is why the full run takes longer than a normal speedtest. Please let the test finish so the results are meaningful.
				</p>
			</>),
		},
		{
			title: "Why should I let the test run in the background?",
			body: () => (<>
				<p>
					If you enable the checkbox below the start button, the test will automatically repeat until you leave this page. All transit providers are tested in sequence, and each run creates a new dataset. The order is always randomised.
				</p>
				<p>
					This helps us collect more data and produce more reliable results.
				</p>
			</>),
		},
		{
			title: "Can I use my device while the test is running?",
			body: "While the test is running, you should avoid bandwidth-heavy activities like video streaming or file sharing on the same connection. CPU-intensive tasks on the same device may also affect the results. Ideally, let the test run in your browser while you are not actively using the computer.",
		},
		{
			title: "How can I get the most accurate results?",
			body: () => (<>
				<p>
					If possible, run the speedtest using a stable connection — ideally on a computer connected to the router via LAN cable.
				</p>
				<p>
					If you’re using Wi-Fi, make sure your device is close to the router and that there are no obstacles (e.g. walls) weakening the signal.
				</p>
				<p>
					This ensures that any slowdown is caused by your internet connection, not by your home network.
				</p>
			</>),
		},
		{
			title: "What is your privacy policy?",
			body: () => (<>
				<p>
					Tl;dr: we don’t store personal data. We can’t and don’t want to know who you are. Your participation is anonymous.
				</p>
				<p>
					The test only stores the network part of your IP address, not the full identifier. For IPv4, we only keep the first three octets.
				</p>
				<p>
					All measurements from a single run are grouped together so we can see they came from the same connection, without being able to identify you.
				</p>
				<p>
					For all other functions of this website, please refer to the general
					<a href="https://epicenter.works/datenschutz" target="_blank">privacy policy</a> of epicenter.works.
				</p>
			</>),
		},
		{
			title: "How does a VPN affect the measurement?",
			body: () => (<>
				<p>
					Please run the test without a VPN. Only then can we detect and address real-world issues.
				</p>
				<p>
					A VPN can significantly distort the results because it reroutes all of your traffic through a different path, bypassing potential bottlenecks between your provider and the transit operators. A VPN may help in everyday use, but it prevents a meaningful measurement of the actual problem.
				</p>
			</>),
		},
		{
			title: "Why are you working with Cloudflare?",
			body: () => (<>
				The Netzbremse campaign is run by civil society. Without Cloudflare’s support, we wouldn’t have the technical resources to provide such a complex measurement tool. Like many network and hosting providers, Cloudflare has already <a href="https://blog.cloudflare.com/eu-network-usage-fees/" target="_blank">publicly commented on the Netzbremse issue</a>.
			</>),
		},
		{
			title: "What happens with the test results?",
			body: "We first need to collect enough data to allow meaningful statistical analysis. Only with a sufficient data set can we draw reliable conclusions. As part of this process, we will also provide the data to the Federal Network Agency (BNetzA) so they can independently verify our results.",
		},
		{
			title: "Can I run this test automated without a browser?",
			body: () => (<>
				Yes, you can find all information for headless operation on your server etc. <a href="https://github.com/AKVorrat/netzbremse-measurement/" target="_blank">here</a>.
			</>),
		},
	]
}

