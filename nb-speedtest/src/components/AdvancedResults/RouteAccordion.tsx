import { Component } from "solid-js";
import { Results } from "@cloudflare/speedtest";
import { TbDownload, TbUpload, TbClock } from "solid-icons/tb";
import { t } from "../../i18n/dict";
import { formatSpeed, formatLatency } from "./utils/formatting";
import { BandwidthChart } from "./charts/BandwidthChart";
import { LatencyChart } from "./charts/LatencyChart";

type RouteData = {
  route: string;
  server: string;
  summary: any;
  result: Results;
};

export const RouteAccordion: Component<{
  routeData: RouteData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}> = (props) => {
  return (
    <div class="collapse collapse-arrow bg-base-200">
      <input
        type="checkbox"
        class="peer"
        checked={props.isOpen}
        onChange={props.onToggle}
      />
      <div class="collapse-title text-lg font-medium peer-checked:bg-base-300 peer-checked:text-base-content">
        <div class="flex items-center justify-between">
          <span>{props.routeData.route}</span>
          <div class="text-sm opacity-70 flex items-center gap-4">
            <span class="flex items-center gap-1">
              <TbDownload class="w-4 h-4" />
              {formatSpeed(props.routeData.summary.download)} {t.advancedResults.mbps()}
            </span>
            <span class="flex items-center gap-1">
              <TbClock class="w-4 h-4" />
              {formatLatency(Math.max(props.routeData.summary.downLoadedLatency || 0))} {t.advancedResults.ms()}
            </span>
            <span class="flex items-center gap-1">
              <TbUpload class="w-4 h-4" />
              {formatSpeed(props.routeData.summary.upload)} {t.advancedResults.mbps()}
            </span>
            <span class="flex items-center gap-1">
              <TbClock class="w-4 h-4" />
              {formatLatency(Math.max(props.routeData.summary.upLoadedLatency || 0))} {t.advancedResults.ms()}
            </span>
          </div>
        </div>
      </div>
      <div class="collapse-content peer-checked:bg-base-300">
        <div class="">
          {/* Raw Metrics */}
          <h4 class="font-semibold mb-3">{t.advancedResults.rawMetrics()}</h4>
          <div class="flex-col gap-4 mb-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex justify-between">
                <span>{t.advancedResults.downloadSpeed()}:</span>
                <span class="font-mono">{formatSpeed(props.routeData.summary.download)} {t.advancedResults.mbps()}</span>
              </div>
              <div class="flex justify-between">
                <span>{t.advancedResults.uploadSpeed()}:</span>
                <span class="font-mono">{formatSpeed(props.routeData.summary.upload)} {t.advancedResults.mbps()}</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex justify-between">
                <span>{t.advancedResults.loadedLatencyDown()}:</span>
                <span class="font-mono">{formatLatency(props.routeData.summary.downLoadedLatency)} {t.advancedResults.ms()}</span>
              </div>
              <div class="flex justify-between">
                <span>{t.advancedResults.jitter()}:</span>
                <span class="font-mono">{formatLatency(props.routeData.summary.downLoadedJitter)} {t.advancedResults.ms()}</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex justify-between">
                <span>{t.advancedResults.loadedLatencyUp()}:</span>
                <span class="font-mono">{formatLatency(props.routeData.summary.upLoadedLatency)} {t.advancedResults.ms()}</span>
              </div>
              <div class="flex justify-between">
                <span>{t.advancedResults.jitter()}:</span>
                <span class="font-mono">{formatLatency(props.routeData.summary.upLoadedJitter)} {t.advancedResults.ms()}</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex justify-between">
                <span>{t.advancedResults.idleLatency()}:</span>
                <span class="font-mono">{formatLatency(props.routeData.summary.latency)} {t.advancedResults.ms()}</span>
              </div>
              <div class="flex justify-between">
                <span>{t.advancedResults.jitter()}:</span>
                <span class="font-mono">{formatLatency(props.routeData.summary.jitter)} {t.advancedResults.ms()}</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div class="space-y-4">
            {/* Bandwidth Charts - Two Columns on Desktop */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div class="bg-base-100 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <TbDownload class="w-5 h-5" />
                  <h5 class="font-medium">Download</h5>
                </div>
                <BandwidthChart
                  points={props.routeData.result.getDownloadBandwidthPoints()}
                  title={`Download - ${props.routeData.route}`}
                  type="download"
                />
              </div>

              <div class="bg-base-100 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <TbUpload class="w-5 h-5" />
                  <h5 class="font-medium">Upload</h5>
                </div>
                <BandwidthChart
                  points={props.routeData.result.getUploadBandwidthPoints()}
                  title={`Upload - ${props.routeData.route}`}
                  type="upload"
                />
              </div>
            </div>

            {/* Latency Charts - Three Separate Charts Stacked */}
            <div class="space-y-3">
              <div class="bg-base-100 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <TbClock class="w-5 h-5" style="color: #e00370" />
                  <h5 class="font-medium">Latenz</h5>
                </div>
                <LatencyChart
                  points={props.routeData.result.getUnloadedLatencyPoints()}
                  title={`Latenz - ${props.routeData.route}`}
                  opacity={0.8}
                />
              </div>

              <div class="bg-base-100 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <TbDownload class="w-5 h-5" style="color: #e00370" />
                  <h5 class="font-medium">Latenz unter Download-Last</h5>
                </div>
                <LatencyChart
                  points={props.routeData.result.getDownLoadedLatencyPoints()}
                  title={`Latenz unter Download-Last - ${props.routeData.route}`}
                  opacity={0.8}
                />
              </div>

              <div class="bg-base-100 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <TbUpload class="w-5 h-5" style="color: #e00370" />
                  <h5 class="font-medium">Latenz unter Upload-Last</h5>
                </div>
                <LatencyChart
                  points={props.routeData.result.getUpLoadedLatencyPoints()}
                  title={`Latenz unter Upload-Last - ${props.routeData.route}`}
                  opacity={0.6}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};