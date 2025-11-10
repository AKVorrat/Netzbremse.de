import SpeedTestEngine, { ConfigOptions, Results } from "@cloudflare/speedtest"
import { createAnimatedSignal } from "./animated-signal"
import { createSignal, onCleanup, runWithOwner } from "solid-js"
import { config as appConfig } from "../data/config"

type SpeedTestCallbacks = {
	onDone?: (results: Results) => void
	onError?: (error: Error) => void
	timeoutMs?: number
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

	let timeoutId: number | undefined
	const timeoutMs = callbacks.timeoutMs ?? appConfig.speedtestTimeoutMs

	const clearTimeoutTimer = () => {
		if (timeoutId) {
			clearTimeout(timeoutId)
			timeoutId = undefined
		}
	}

	const resetTimeoutTimer = () => {
		if (timeoutMs <= 0) return
		clearTimeoutTimer()

		if (isRunning() && !isFinished()) {
			timeoutId = setTimeout(() => {
				const error = new Error(`Speedtest timeout after ${timeoutMs}ms`)
				console.error("Speedtest timeout", error)
				speedTest.pause()
				if (callbacks.onError) {
					callbacks.onError(error)
				}
			}, timeoutMs)
		}
	}

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

		resetTimeoutTimer()
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

		if (running) {
			resetTimeoutTimer()
		} else {
			clearTimeoutTimer()
		}
	}
	speedTest.onFinish = () => {
		clearTimeoutTimer()
		setIsFinished(true)
		if (callbacks.onDone) callbacks.onDone(speedTest.results)
	}
	speedTest.onError = (error) => {
		clearTimeoutTimer()
		console.error("Speedtest error", error)
		if (callbacks.onError) {
			callbacks.onError(new Error(error))
		}
	}
	onCleanup(() => {
		clearTimeoutTimer()
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

