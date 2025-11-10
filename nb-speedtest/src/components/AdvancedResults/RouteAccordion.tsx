import { Component, createMemo } from "solid-js";
import { TbDownload, TbUpload, TbClock } from "solid-icons/tb";
import { useTranslation } from "../../i18n/context";
import { formatSpeed } from "./utils/formatting";
import { formatLatencyDisplay } from "../../util/format-latency";
import { BandwidthChart } from "./charts/BandwidthChart";
import { LatencyChart } from "./charts/LatencyChart";
import { TestResult } from "../../types/test-result";

export const RouteAccordion: Component<{
  testResult: TestResult & { success: true };
}> = (props) => {
  const { t } = useTranslation();
  const downloadPoints = createMemo(() => props.testResult.result.getDownloadBandwidthPoints());
  const uploadPoints = createMemo(() => props.testResult.result.getUploadBandwidthPoints());
  const unloadedLatencyPoints = createMemo(() => props.testResult.result.getUnloadedLatencyPoints());
  const downLoadedLatencyPoints = createMemo(() => props.testResult.result.getDownLoadedLatencyPoints());
  const upLoadedLatencyPoints = createMemo(() => props.testResult.result.getUpLoadedLatencyPoints());
  const summary = createMemo(() => props.testResult.result.getSummary());

  return (
    <div class="collapse collapse-arrow bg-base-200">
      <input
        type="checkbox"
        class="peer"
      />
      <div class="collapse-title text-lg font-medium peer-checked:bg-base-300 peer-checked:text-base-content">
        <div class="flex flex-row flex-wrap items-center justify-between gap-2">
          <span class="text-base lg:text-lg">{props.testResult.label}</span>
          <div class="text-xs lg:text-sm opacity-70 flex flex-wrap items-center justify-center gap-2 lg:gap-4">
            <span class="flex items-center gap-1">
              <TbDownload class="w-4 h-4" />
              {formatSpeed(summary()?.download)} {t.advancedResults.mbps()}
            </span>
            <span class="flex items-center gap-1">
              <TbClock class="w-4 h-4" />
              {formatLatencyDisplay(summary()?.downLoadedLatency)} {t.advancedResults.ms()}
            </span>
            <span class="flex items-center gap-1">
              <TbUpload class="w-4 h-4" />
              {formatSpeed(summary()?.upload)} {t.advancedResults.mbps()}
            </span>
            <span class="flex items-center gap-1">
              <TbClock class="w-4 h-4" />
              {formatLatencyDisplay(summary()?.upLoadedLatency)} {t.advancedResults.ms()}
            </span>
          </div>
        </div>
      </div>
      <div class="collapse-content peer-checked:bg-base-300">
        <div class="w-full max-w-full overflow-hidden">
          {/* Raw Metrics */}
          <h4 class="font-semibold mb-3">{t.advancedResults.rawMetrics()}</h4>
          <div class="flex flex-col gap-1 mb-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4">
              <div class="flex justify-between">
                <span class="text-sm lg:text-base">{t.advancedResults.downloadSpeed()}:</span>
                <span class="font-mono text-sm lg:text-base">{formatSpeed(summary()?.download)} {t.advancedResults.mbps()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm lg:text-base">{t.advancedResults.uploadSpeed()}:</span>
                <span class="font-mono text-sm lg:text-base">{formatSpeed(summary()?.upload)} {t.advancedResults.mbps()}</span>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4">
              <div class="flex justify-between">
                <span class="text-sm lg:text-base">{t.advancedResults.loadedLatencyDown()}:</span>
                <span class="font-mono text-sm lg:text-base">{formatLatencyDisplay(summary()?.downLoadedLatency)} {t.advancedResults.ms()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm lg:text-base">{t.advancedResults.jitter()}:</span>
                <span class="font-mono text-sm lg:text-base">{formatLatencyDisplay(summary()?.downLoadedJitter)} {t.advancedResults.ms()}</span>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4">
              <div class="flex justify-between">
                <span class="text-sm lg:text-base">{t.advancedResults.loadedLatencyUp()}:</span>
                <span class="font-mono text-sm lg:text-base">{formatLatencyDisplay(summary()?.upLoadedLatency)} {t.advancedResults.ms()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm lg:text-base">{t.advancedResults.jitter()}:</span>
                <span class="font-mono text-sm lg:text-base">{formatLatencyDisplay(summary()?.upLoadedJitter)} {t.advancedResults.ms()}</span>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4">
              <div class="flex justify-between">
                <span class="text-sm lg:text-base">{t.advancedResults.idleLatency()}:</span>
                <span class="font-mono text-sm lg:text-base">{formatLatencyDisplay(summary()?.latency)} {t.advancedResults.ms()}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm lg:text-base">{t.advancedResults.jitter()}:</span>
                <span class="font-mono text-sm lg:text-base">{formatLatencyDisplay(summary()?.jitter)} {t.advancedResults.ms()}</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div class="space-y-4 w-full max-w-full">
            {/* Bandwidth Charts - Two Columns on Desktop */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              <div class="bg-base-100 rounded-lg p-3 lg:p-4 w-full min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <TbDownload class="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  <h5 class="font-medium text-sm lg:text-base">{t.advancedResults.download()}</h5>
                </div>
                <BandwidthChart
                  points={downloadPoints()}
                  title={`${t.advancedResults.download()} - ${props.testResult.label}`}
                  type="download"
                />
              </div>

              <div class="bg-base-100 rounded-lg p-3 lg:p-4 w-full min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <TbUpload class="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  <h5 class="font-medium text-sm lg:text-base">{t.advancedResults.upload()}</h5>
                </div>
                <BandwidthChart
                  points={uploadPoints()}
                  title={`${t.advancedResults.upload()} - ${props.testResult.label}`}
                  type="upload"
                />
              </div>
            </div>

            {/* Latency Charts - Three Separate Charts Stacked */}
            <div class="space-y-3 w-full">
              <div class="bg-base-100 rounded-lg p-3 lg:p-4 w-full min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <TbClock class="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  <h5 class="font-medium text-sm lg:text-base">{t.advancedResults.latency()}</h5>
                </div>
                <LatencyChart
                  points={unloadedLatencyPoints()}
                  title={`${t.advancedResults.latency()} - ${props.testResult.label}`}
                  opacity={0.8}
                />
              </div>

              <div class="bg-base-100 rounded-lg p-3 lg:p-4 w-full min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <TbDownload class="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  <h5 class="font-medium text-sm lg:text-base">{t.advancedResults.loadedLatencyDown()}</h5>
                </div>
                <LatencyChart
                  points={downLoadedLatencyPoints()}
                  title={`${t.advancedResults.loadedLatencyDown()} - ${props.testResult.label}`}
                  opacity={0.8}
                />
              </div>

              <div class="bg-base-100 rounded-lg p-3 lg:p-4 w-full min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <TbUpload class="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                  <h5 class="font-medium text-sm lg:text-base">{t.advancedResults.loadedLatencyUp()}</h5>
                </div>
                <LatencyChart
                  points={upLoadedLatencyPoints()}
                  title={`${t.advancedResults.loadedLatencyUp()} - ${props.testResult.label}`}
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
