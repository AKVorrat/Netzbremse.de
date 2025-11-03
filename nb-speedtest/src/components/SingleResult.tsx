import { Results } from "@cloudflare/speedtest";
import { TbDownload, TbUpload, TbExclamationCircle } from "solid-icons/tb";
import { Component, Show, type JSX } from "solid-js";
import { TestResult } from "../types/test-result";
import { useTranslation } from "../i18n/context";

const statPadding = "py-2 px-2"

const Stat: Component<{ label?: string, bandwidth: number, latency: number, jitter: number, icon?: JSX.Element }> = (props) => {
  const { t } = useTranslation();
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

const ErrorDisplay: Component<{ error: Error }> = (props) => {
  const { t } = useTranslation();
  return <div class="stats shadow-md my-1 bg-base-200 px-2 overflow-x-hidden max-[25tem]:stats-vertical">
    <div class={`stat text-primary ${statPadding}`}>
      <div class="stat-figure text-3xl" title="Error">
        <TbExclamationCircle />
      </div>
      <div class="stat-value font-title leading-none">
        {t.speedtest.error()}
      </div>
    </div>
  </div>
}

export const SingleResult: Component<{ result?: TestResult }> = (props) => {
  return <Show
    when={props.result?.success !== false}
    fallback={<ErrorDisplay error={props.result?.success === false ? props.result.error : new Error("Unknown error")} />}
  >
    <div class="stats shadow-md my-1 bg-base-200 px-2 overflow-x-hidden max-[25tem]:stats-vertical">
      <Stat bandwidth={props.result?.success ? props.result.result.getSummary()?.download : 0} latency={props.result?.success ? props.result.result.getSummary()?.downLoadedLatency : 0} jitter={props.result?.success ? props.result.result.getSummary()?.downLoadedJitter : 0} icon={<TbDownload />}></Stat>
      <Stat bandwidth={props.result?.success ? props.result.result.getSummary()?.upload : 0} latency={props.result?.success ? props.result.result.getSummary()?.upLoadedLatency : 0} jitter={props.result?.success ? props.result.result.getSummary()?.upLoadedJitter : 0} icon={<TbUpload />}></Stat>
    </div>
  </Show>
}
