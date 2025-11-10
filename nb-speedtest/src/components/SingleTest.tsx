import { Component, createEffect, createSignal, on, onCleanup, Show, Signal, untrack } from "solid-js"
import { SpeedStat } from "./SpeedStat"
import SpeedTest, { ConfigOptions, Results } from "@cloudflare/speedtest"
import { TestResult } from "../types/test-result"
import { TbPlayerPauseFilled } from "solid-icons/tb"
import { createSpeedtest } from "../util/create-speedtest"
import { createFakeSpeedtest } from "../util/create-fake-speedtest"
import { parseEnvBoolean } from "../util/env"
import { useTranslation } from "../i18n/context"

export const SingleTest: Component<{
  label: string, run: boolean, config: ConfigOptions, onComplete?: (outcome: TestResult) => void
}> = (props) => {
  const { t } = useTranslation()
  const useFakeSpeedtest = parseEnvBoolean(import.meta.env.VITE_FAKE_SPEEDTEST)

  const st = useFakeSpeedtest
    ? createFakeSpeedtest(props.config, {
      onDone: (result) => props.onComplete?.({ success: true, result, label: props.label })
    })
    : createSpeedtest(props.config, {
      onDone: (result) => props.onComplete?.({ success: true, result, label: props.label }),
      onError: (error) => {
        console.error(`Speedtest ${props.label} error:`, error)
        props.onComplete?.({ success: false, error, label: props.label })
      }
    })
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
    <div class="text-center text-base-content font-title text-sm">
      {t.speedtest.idleLatencyDisplay(
        st.idleLatency() ? st.idleLatency()!.toLocaleString(undefined, { maximumFractionDigits: 0 }).padStart(3, " ") : '-',
        st.idleJitter() ? st.idleJitter()!.toLocaleString(undefined, { maximumFractionDigits: 0 }).padStart(3, " ") : '-'
      )}
    </div>
  </div>
}
