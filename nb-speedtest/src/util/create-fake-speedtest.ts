import { ConfigOptions, Results } from "@cloudflare/speedtest"
import { createSignal, onCleanup } from "solid-js"

type SpeedTestCallbacks = {
	onDone?: (results: Results) => void
	onError?: (error: Error) => void
	timeoutMs?: number
}

export function createFakeSpeedtest(config: ConfigOptions, callbacks: SpeedTestCallbacks) {
	const [isRunning, setIsRunning] = createSignal(false)
	const [isFinished, setIsFinished] = createSignal(false)
	const [download, setDownload] = createSignal(0)
	const [upload, setUpload] = createSignal(0)
	const [downLoadedLatency, setDownLoadedLatency] = createSignal(0)
	const [upLoadedLatency, setUpLoadedLatency] = createSignal(0)
	const [downLoadedJitter, setDownLoadedJitter] = createSignal(0)
	const [upLoadedJitter, setUpLoadedJitter] = createSignal(0)

	let simulationInterval: number | undefined
	let simulationTimeout: number | undefined

	// Store data points during simulation
	const downloadPoints: any[] = []
	const uploadPoints: any[] = []
	const downLoadedLatencyPoints: number[] = []
	const upLoadedLatencyPoints: number[] = []
	const unloadedLatencyPoints: number[] = []

	const play = () => {
		if (isRunning() || isFinished()) return

		setIsRunning(true)

		let progress = 0
		const startTime = Date.now()
		simulationInterval = setInterval(() => {
			progress += Math.random() * 20

			// Simulate realistic values in bytes per second
			const downloadSpeed = Math.min(progress * 200000, 10000000 + Math.random() * 5000000) // 10-15 MB/s
			const uploadSpeed = Math.min(progress * 150000, 8000000 + Math.random() * 4000000) // 8-12 MB/s
			const downLatency = 20 + Math.random() * 10
			const upLatency = downLatency + Math.random() * 5
			const downJitter = 1 + Math.random() * 5
			const upJitter = downJitter + Math.random() * 2
			const unloadedLatency = 15 + Math.random() * 8

			setDownload(downloadSpeed)
			setUpload(uploadSpeed)
			setDownLoadedLatency(downLatency)
			setUpLoadedLatency(upLatency)
			setDownLoadedJitter(downJitter)
			setUpLoadedJitter(upJitter)

			// Store data points
			const currentTime = Date.now()
			const measTime = currentTime - startTime

			downloadPoints.push({
				bytes: downloadSpeed * 0.1, // 100ms worth of bytes
				bps: downloadSpeed,
				duration: 100,
				ping: downLatency,
				measTime,
				serverTime: currentTime,
				transferSize: downloadSpeed * 0.1
			})

			uploadPoints.push({
				bytes: uploadSpeed * 0.1, // 100ms worth of bytes
				bps: uploadSpeed,
				duration: 100,
				ping: upLatency,
				measTime,
				serverTime: currentTime,
				transferSize: uploadSpeed * 0.1
			})

			downLoadedLatencyPoints.push(downLatency)
			upLoadedLatencyPoints.push(upLatency)
			unloadedLatencyPoints.push(unloadedLatency)
		}, 100)

		// Use provided timeout or default to 10 seconds
		const timeoutDuration = callbacks.timeoutMs || 10000
		simulationTimeout = setTimeout(() => {
			if (simulationInterval) clearInterval(simulationInterval)
			setIsRunning(false)
			setIsFinished(true)

			// Always trigger timeout error when timeout duration is reached
			if (callbacks.onError) {
				callbacks.onError(new Error("Test timeout"))
			}
			return
		}, timeoutDuration)

		// Finish successfully after 3-5 seconds if no timeout
		const successTimeout = setTimeout(() => {
			if (!isRunning()) return // Already finished/paused

			if (simulationInterval) clearInterval(simulationInterval)
			if (simulationTimeout) clearTimeout(simulationTimeout)
			setIsRunning(false)
			setIsFinished(true)

			if (callbacks.onDone) {
				const latency = 20 + Math.random() * 10
				const jitter = 1 + Math.random() * 5

				const mockResults: Results = {
					isFinished: true,
					getSummary: () => ({
						download: download(),
						upload: upload(),
						downLoadedLatency: downLoadedLatency(),
						upLoadedLatency: upLoadedLatency(),
						downLoadedJitter: downLoadedJitter(),
						upLoadedJitter: upLoadedJitter(),
						latency: latency,
						jitter: jitter,
					}),
					getUnloadedLatency: () => latency,
					getUnloadedJitter: () => jitter,
					getUnloadedLatencyPoints: () => unloadedLatencyPoints,
					getDownLoadedLatency: () => downLoadedLatency(),
					getDownLoadedJitter: () => downLoadedJitter(),
					getDownLoadedLatencyPoints: () => downLoadedLatencyPoints,
					getUpLoadedLatency: () => upLoadedLatency(),
					getUpLoadedJitter: () => upLoadedJitter(),
					getUpLoadedLatencyPoints: () => upLoadedLatencyPoints,
					getDownloadBandwidth: () => download(),
					getDownloadBandwidthPoints: () => downloadPoints,
					getUploadBandwidth: () => upload(),
					getUploadBandwidthPoints: () => uploadPoints,
				} as Results
				callbacks.onDone(mockResults)
			}
		}, 3000 + Math.random() * 2000) // 3-5 seconds
	}

	const pause = () => {
		if (!isRunning()) return

		setIsRunning(false)

		if (simulationInterval) clearInterval(simulationInterval)
		if (simulationTimeout) clearTimeout(simulationTimeout)
	}

	onCleanup(() => {
		if (simulationInterval) clearInterval(simulationInterval)
		if (simulationTimeout) clearTimeout(simulationTimeout)
	})

	return {
		play,
		pause,
		isRunning,
		isFinished,
		download,
		upload,
		downLoadedLatency,
		upLoadedLatency,
		downLoadedJitter,
		upLoadedJitter,
	}
}
