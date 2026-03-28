import SpeedTestEngine, { ConfigOptions, Results } from "@cloudflare/speedtest"
import { createAnimatedSignal } from "./animated-signal"
import { createSignal, onCleanup, runWithOwner } from "solid-js"
import { config as appConfig } from "../data/config"
import { SpeedtestError } from "../types/speedtest-error"

type SpeedTestCallbacks = {
	onDone?: (results: Results) => void // callbacks are called exactly once, either onDone or onError, never both
	onError?: (error: SpeedtestError) => void
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
	const [idleLatency, setIdleLatency, setIdleLatencyPaused] = createAnimatedSignal()
	const [idleJitter, setIdleJitter, setIdleJitterPaused] = createAnimatedSignal()

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
				if (isFinished()) return
				setIsFinished(true)
				const error = { message: `Speedtest timeout after ${timeoutMs}ms` }
				speedTest.pause()
				callbacks.onError?.(error)
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
		setIdleLatency(res.latency)
		setIdleJitter(res.jitter)
		console.log(`Updated Stats: Down ${res.download}, Down Lat ${res.downLoadedLatency}, Down Jit ${res.downLoadedJitter}, Up ${res.upload}, Up Lat ${res.upLoadedLatency}, Up Jit ${res.upLoadedJitter}, Idle Lat ${res.latency}, Idle Jit ${res.jitter}`)

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
		setIdleLatencyPaused(!running)
		setIdleJitterPaused(!running)

		if (running) {
			resetTimeoutTimer()
		} else {
			clearTimeoutTimer()
		}
	}

	speedTest.onFinish = () => {
		clearTimeoutTimer()

		// make sure we only ever do the callback once
		if (isFinished()) return
		setIsFinished(true)

		const summary = speedTest.results.getSummary()
		console.log("done", summary, speedTest.results.getDownloadBandwidth())
		if (!summary.download && !summary.upload) { // we consider a speedtest with no results failed
			callbacks.onError?.({ message: "All measurements failed" })
		} else {
			callbacks.onDone?.(speedTest.results)
		}
	}

	// speedtest can return multiple errors when individual measurements fail
	// errors are non terminal so for our purpose they are more like warnings
	speedTest.onError = (error) => {
		console.warn("Speedtest measurement error:", error)
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
		idleLatency,
		idleJitter,
	}
}

