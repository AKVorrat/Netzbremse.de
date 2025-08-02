import { TbDownload, TbUpload } from "solid-icons/tb";
import { Component, Show } from "solid-js";
import { t } from "../i18n/dict";

export const SpeedStat: Component<{ speed?: number, latency?: number, direction: "upload" | "download" }> = (props) => {
  const roundingOptions: Intl.NumberFormatOptions = { minimumSignificantDigits: 2 }
  const latency = () => props.latency ? props.latency.toLocaleString(undefined, { maximumFractionDigits: 0 }).padStart(3, " ") : '  -'
  const speed = () => props.speed ? (props.speed / 1e6).toLocaleString(undefined, { minimumSignificantDigits: 3, maximumSignificantDigits: 3 }).padStart(3, " ") : '  -'

  return <div class="stat bg-base-200">
    <div class="stat-figure text-primary text-3xl">
      <Show when={props.direction === "upload"} fallback={ <TbDownload/> }>
        <TbUpload/>
      </Show>
    </div>
    <div class="stat-title">
      <Show when={props.direction === "upload"} fallback={ t.speedtest.download() }>
        { t.speedtest.upload() }
      </Show>
    </div>
    <div class="stat-value text-primary font-title">
      <span class="inline-block min-w-[3ch] text-end">{ speed() }</span>
      &nbsp;
      <span>Mbit</span>
    </div>
    <div class="stat-desc min-w-[35ch] font-title">
      <Show when={props.direction === "upload"} fallback={ t.speedtest.latencyDuringDownload(latency()) }>
        { t.speedtest.latencyDuringUpload(latency()) }
      </Show>
    </div>
  </div>

}