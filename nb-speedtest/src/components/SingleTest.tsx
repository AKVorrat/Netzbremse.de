import { Component, createEffect, createSignal, Show, Signal, untrack } from "solid-js"
import { SpeedStat } from "./SpeedStat"
import SpeedTest, { ConfigOptions, Results } from "@cloudflare/speedtest"
import { createAnimatedSignal } from "../util/animated-signal"

export const SingleTest: Component<{
  label: string, run: boolean, config?: ConfigOptions, onDone?: (result: Results) => void
}> = (props) => {
  const [download, setDownload] = createAnimatedSignal()
  const [upload, setUpload] = createAnimatedSignal()
  const [downLoadedLatency, setDownLoadedLatency] = createAnimatedSignal()
  const [upLoadedLatency, setUpLoadedLatency] = createAnimatedSignal()
  const [downLoadedJitter, setDownLoadedJitter] = createAnimatedSignal()
  const [upLoadedJitter, setUpLoadedJitter] = createAnimatedSignal()

  const speedTest = new SpeedTest({
    ...props.config,
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
  }
  speedTest.onFinish = () => {
    if (props.onDone) {
      props.onDone(speedTest.results)
    }
  }
  speedTest.onError = (error) => {
    console.error("Speedtest error", error)
  }

  createEffect(() => {
    const label = untrack(() => props.label);
    if (props.run && !speedTest.isRunning && !speedTest.isFinished) {
      console.log("starting/resuming speedtest", label)
      speedTest.play()
    } else if (!props.run && speedTest.isRunning) {
      console.log("pausing speedtest", label)
      speedTest.pause()
    }
  })

  return <div>
    <div class='flex items-center justify-center gap-3 mb-2'>
      <Show when={props.run}>
        <span class="loading loading-ring loading-md text-primary"></span>
      </Show>
      <h3 class='text-2xl'>{props.label}</h3>
    </div>
    <div class="stats stats-vertical shadow-md my-3 w-full">
      <SpeedStat speed={download()} latency={downLoadedLatency()} jitter={downLoadedJitter()} direction='download' />
      <SpeedStat speed={upload()} latency={upLoadedLatency()} jitter={upLoadedJitter()} direction='upload' />
    </div>
  </div>
}
