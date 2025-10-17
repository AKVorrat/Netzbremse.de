import SpeedTestEngine, { ConfigOptions, Results } from "@cloudflare/speedtest"
import { createAnimatedSignal } from "./animated-signal"
import { createSignal, onCleanup, runWithOwner } from "solid-js"

type SpeedTestCallbacks = {
	onDone?: (results: Results) => void
}

export function createSpeedtest(config: ConfigOptions, callbacks: SpeedTestCallbacks) {
	const [isRunning, setIsRunning] = createSignal(false)
	const [isFinished, setIsFinished] = createSignal(false)
	const [download, setDownload, setDownloadPaused] = createAnimatedSignal()
	const [upload, setUpload, setUploadPuased] = createAnimatedSignal()
	const [downLoadedLatency, setDownLoadedLatency, setDownLoadedLatencyPaused] = createAnimatedSignal()
	const [upLoadedLatency, setUpLoadedLatency, setUpLoadedLatencyPaused] = createAnimatedSignal()
	const [downLoadedJitter, setDownLoadedJitter, setDownLoadedJitterPaused] = createAnimatedSignal()
	const [upLoadedJitter, setUpLoadedJitter, setUpLoadedJitterPaused] = createAnimatedSignal()

	const speedTest =
		new SpeedTestEngine({
			...config,
			autoStart: false,
		})
	speedTest.onResultsChange = (r) => {
		const res = speedTest.results.getSummary()
		setDownload(res.download)
		setDownLoadedLatency(res.downLoadedLatency)
		setDownLoadedJitter(res.downLoadedJitter)
		setUpload(res.upload)
		setUpLoadedLatency(res.upLoadedLatency)
		setUpLoadedJitter(res.upLoadedJitter)
		console.log(`Updated Stats: Down ${res.download}, Down Lat ${res.downLoadedLatency}, Down Jit ${res.downLoadedJitter}, Up ${res.upload}, Up Lat ${res.upLoadedLatency}, Up Jit ${res.upLoadedLatency}`)
	}
	speedTest.onRunningChange = (running) => {
		console.log("SpeedTest Running Change", running)
		setIsRunning(running)
		setDownloadPaused(!running)
		setDownLoadedLatencyPaused(!running)
		setDownLoadedJitterPaused(!running)
		setUploadPuased(!running)
		setUpLoadedLatencyPaused(!running)
		setUpLoadedJitterPaused(!running)
	}
	speedTest.onFinish = () => {
		setIsFinished(true)
		if (callbacks.onDone) callbacks.onDone(speedTest.results)
	}
	speedTest.onError = (error) => {
		console.error("Speedtest error", error)
	}
	onCleanup(() => {
		if (speedTest?.isRunning) {
			speedTest.pause()
		}
	})

	return {
		// speedTest,
		play: () => speedTest.play(),
		pause: () => speedTest.pause(),
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

