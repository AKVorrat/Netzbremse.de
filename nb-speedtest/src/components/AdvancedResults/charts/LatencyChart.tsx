import { Component, onCleanup, createMemo, Show } from "solid-js";
import { Chart } from 'chart.js';
import { getLatencyChartConfig, CHART_COLORS } from "../utils/chart-config";
import { calculateStats } from "../utils/statistics";
import { StatisticalSummary } from "./StatisticalSummary";
import { useTranslation } from "../../../i18n/context";

export const LatencyChart: Component<{
  points: number[] | undefined;
  title: string;
  opacity?: number;
}> = (props) => {
  const { t } = useTranslation();
  const opacity = props.opacity ?? 0.8;
  let chartInstance: Chart | null = null;
  let resizeObserver: ResizeObserver | null = null;

  const chartData = createMemo(() => {
    if (!props.points?.length) return null;
    return props.points.map((latency) => ({ x: latency, y: 1 }));
  });

  const stats = createMemo(() => calculateStats(props.points));

  const createChart = (canvas: HTMLCanvasElement) => {
    const data = chartData();
    if (!data) {
      return
    }

    chartInstance = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: props.title,
            data: data,
            backgroundColor: CHART_COLORS.primaryRgba(opacity),
            borderColor: CHART_COLORS.primary,
            pointRadius: 6,
            pointHoverRadius: 8
          }
        ]
      },
      options: getLatencyChartConfig(props.title, t.advancedResults.latencyMs(), t.advancedResults.ms())
    });

    resizeObserver = new ResizeObserver(() => {
      if (chartInstance) {
        chartInstance.resize();
      }
    });
    resizeObserver.observe(canvas.parentElement!);

    return chartInstance;
  };

  onCleanup(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });

  return <>
    <div class="h-32 w-full max-w-full overflow-hidden">
      <Show when={chartData()}>
        <canvas
          ref={(el) => {
            if (el) {
              setTimeout(() => createChart(el), 100);
            }
          }}
          class="w-full h-full max-w-full"
        ></canvas>
      </Show>
      <Show when={!chartData()}>
        <span>{t.advancedResults.noLatencyData()}</span>
      </Show>
    </div>
    <StatisticalSummary stats={stats()} />
  </>;
};
