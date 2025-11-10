import { Results } from "@cloudflare/speedtest";
import { TbDownload, TbUpload, TbExclamationCircle } from "solid-icons/tb";
import { Component, Show, type JSX } from "solid-js";
import { TestResult } from "../types/test-result";
import { useTranslation } from "../i18n/context";
import { formatLatencyDisplay } from "../util/format-latency";

const statPadding = "py-2 px-2"

const Stat: Component<{ label?: string, bandwidth: number, latency: number, jitter: number, icon?: JSX.Element }> = (props) => {
  const { t } = useTranslation();
  const bandwdth = () => props.bandwidth ? (props.bandwidth / 1e6).toLocaleString(undefined, { minimumSignificantDigits: 3, maximumSignificantDigits: 3 }) : props.bandwidth
  const latency = () => formatLatencyDisplay(props.latency)
  const jitter = () => formatLatencyDisplay(props.jitter)

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
      <span class="ms-1 text-sm">{t.advancedResults.mbps()}</span>
    </div>
    <div class="stat-desc col-span-2 min-w-[25ch] mt-1">{t.advancedResults.latency()}: {latency()} {t.advancedResults.ms()} | {t.advancedResults.jitter()}: {jitter()} {t.advancedResults.ms()}</div>
  </div>
}

const ErrorDisplay: Component<{ error: Error }> = (props) => {
  const { t } = useTranslation();
  return <div class="stats shadow-md my-1 bg-base-200 px-2 overflow-x-hidden max-[25tem]:stats-vertical">
    <div class={`stat text-primary ${statPadding}`}>
      <div class="stat-figure text-3xl" title={t.speedtest.error()}>
        <TbExclamationCircle />
      </div>
      <div class="stat-value font-title leading-none">
        {t.speedtest.error()}
      </div>
    </div>
  </div>
}

export const SingleResult: Component<{ result?: TestResult }> = (props) => {
  const { t } = useTranslation();
  return <Show
    when={props.result?.success !== false}
    fallback={<ErrorDisplay error={props.result?.success === false ? props.result.error : new Error(t.speedtest.unknownError())} />}
  >
    <div class="stats shadow-md my-1 bg-base-200 px-2 overflow-x-hidden max-[25tem]:stats-vertical">
      <Stat bandwidth={props.result?.success ? props.result.result.getSummary()?.download : 0} latency={props.result?.success ? props.result.result.getSummary()?.downLoadedLatency : undefined} jitter={props.result?.success ? props.result.result.getSummary()?.downLoadedJitter : undefined} icon={<TbDownload />}></Stat>
      <Stat bandwidth={props.result?.success ? props.result.result.getSummary()?.upload : 0} latency={props.result?.success ? props.result.result.getSummary()?.upLoadedLatency : undefined} jitter={props.result?.success ? props.result.result.getSummary()?.upLoadedJitter : undefined} icon={<TbUpload />}></Stat>
    </div>
  </Show>
}
