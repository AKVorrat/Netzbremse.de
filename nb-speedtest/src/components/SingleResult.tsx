import { Results } from "@cloudflare/speedtest";
import { TbDownload, TbUpload } from "solid-icons/tb";
import { Component, Show, type JSX } from "solid-js";
import { t } from "../i18n/dict";

const statPadding = "py-2 px-2"

const Stat: Component<{ label?: string, bandwidth: number, latency: number, jitter: number, icon?: JSX.Element }> = (props) => {
  const bandwdth = () => props.bandwidth ? (props.bandwidth / 1e6).toLocaleString(undefined, { minimumSignificantDigits: 3, maximumSignificantDigits: 3 }) : props.bandwidth
  const latency = () => props.latency?.toLocaleString(undefined, { maximumFractionDigits: 0 })
  const jitter = () => props.jitter?.toLocaleString(undefined, { maximumFractionDigits: 0 })

  return <div class={`stat text-primary pt-3 ${statPadding}`}>
    <div class="stat-figure text-3xl " title={t.speedtest.download()}>
      {props.icon}
    </div>
    <Show when={props.label}>
      <div class="stat-title ">{props.label}</div>
    </Show>
    <div class="stat-value font-title leading-none">
      {bandwdth()}
      <span class="sr-only">&nbsp;</span>
      <span class="ms-1 text-sm">Mbit</span>
    </div>
    <div class="stat-desc col-span-2 min-w-[25ch] mt-1">Latency: {latency()} ms | Jitter: {jitter()} ms</div>
  </div>
}

export const SingleResult: Component<{ result?: Results }> = (props) => {
  const resultSummary = () => props.result?.getSummary()

  return <div class="stats shadow-md my-1 bg-base-200 px-2 overflow-x-hidden max-[25tem]:stats-vertical">
    <Stat bandwidth={resultSummary()?.download} latency={resultSummary()?.downLoadedLatency} jitter={resultSummary()?.downLoadedJitter} icon={<TbDownload />}></Stat>
    <Stat bandwidth={resultSummary()?.upload} latency={resultSummary()?.upLoadedLatency} jitter={resultSummary()?.upLoadedJitter} icon={<TbUpload />}></Stat>
  </div>
}
