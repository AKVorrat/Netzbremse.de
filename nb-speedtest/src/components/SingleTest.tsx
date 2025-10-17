import { Component, createEffect, createSignal, on, onCleanup, Show, Signal, untrack } from "solid-js"
import { SpeedStat } from "./SpeedStat"
import SpeedTest, { ConfigOptions, Results } from "@cloudflare/speedtest"
import { createAnimatedSignal } from "../util/animated-signal"
import { TbPlayerPauseFilled } from "solid-icons/tb"
import { createSpeedtest } from "../util/create-speedtest"
import { createFakeSpeedtest } from "../util/create-fake-speedtest"
import { parseEnvBoolean } from "../util/env"

export const SingleTest: Component<{
  label: string, run: boolean, config: ConfigOptions, onDone?: (result: Results) => void
}> = (props) => {
  const useFakeSpeedtest = parseEnvBoolean(import.meta.env.VITE_FAKE_SPEEDTEST)

  const st = useFakeSpeedtest
    ? createFakeSpeedtest(props.config, { onDone: props.onDone })
    : createSpeedtest(props.config, { onDone: props.onDone })
  console.log("SpeedTest Component initialized!", props.label)

  createEffect(on(() => props.run, (shouldRun, prev) => {
    if (shouldRun && !st.isRunning() && !st.isFinished()) {
      console.log("starting/resuming speedtest", props.label)
      st.play()
    } else if (!shouldRun && st.isRunning()) {
      console.log("pausing speedtest", props.label)
      st.pause()
    }
  }))

  return <div>
    <div class='flex items-center justify-center gap-3 mb-2'>
      <Show when={props.run}>
        <span class="loading loading-ring loading-md text-primary"></span>
      </Show>
      <Show when={!props.run}>
        <span class="aspect-square w-6 text-primary/75 flex justify-center items-center text-lg">
          <TbPlayerPauseFilled />
        </span>
      </Show>
      <h3 class='text-2xl'>{props.label}</h3>
    </div>
    <div class="stats stats-vertical shadow-md my-3 w-fulli overflow-hidden">
      <SpeedStat speed={st.download()} latency={st.downLoadedLatency()} jitter={st.downLoadedJitter()} direction='download' />
      <SpeedStat speed={st.upload()} latency={st.upLoadedLatency()} jitter={st.upLoadedJitter()} direction='upload' />
    </div>
  </div>
}
