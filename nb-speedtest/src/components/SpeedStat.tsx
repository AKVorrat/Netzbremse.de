import { TbDownload, TbUpload } from "solid-icons/tb";
import { Component, Show } from "solid-js";
import { useTranslation } from "../i18n/context";

export const SpeedStat: Component<{ speed?: number, latency?: number, jitter?: number, direction: "upload" | "download" }> = (props) => {
  const { t } = useTranslation();
  const roundingOptions: Intl.NumberFormatOptions = { minimumSignificantDigits: 2 }
  const latency = () => props.latency ? props.latency.toLocaleString(undefined, { maximumFractionDigits: 0 }).padStart(3, " ") : '  -'
  const speed = () => props.speed ? (props.speed / 1e6).toLocaleString(undefined, { minimumSignificantDigits: 3, maximumSignificantDigits: 3 }).padStart(3, " ") : '  -'
  const jitter = () => props.jitter ? props.jitter.toLocaleString(undefined, { maximumFractionDigits: 0 }) : undefined

  return <div class="stat bg-base-200">
    <div class="stat-figure text-primary text-3xl">
      <Show when={props.direction === "upload"} fallback={<TbDownload />}>
        <TbUpload />
      </Show>
    </div>
    <div class="stat-title">
      <Show when={props.direction === "upload"} fallback={t.speedtest.download()}>
        {t.speedtest.upload()}
      </Show>
    </div>
    <div class="stat-value text-primary font-title">
      <span class="inline-block min-w-[3ch] text-end">{speed()}</span>
      &nbsp;
      <span>{t.advancedResults.mbps()}</span>
    </div>
    <div class="stat-desc font-title col-span-2 min-w-[45ch]">
      <Show when={props.direction === "upload"} fallback={t.speedtest.latencyDuringDownload(latency(), jitter())}>
        {t.speedtest.latencyDuringUpload(latency(), jitter())}
      </Show>
    </div>
  </div>

}
