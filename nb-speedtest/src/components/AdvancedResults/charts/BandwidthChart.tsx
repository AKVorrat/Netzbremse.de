import { Component, onCleanup, createMemo } from "solid-js";
import { Chart } from 'chart.js';
import { getBandwidthChartConfig, CHART_COLORS } from "../utils/chart-config";
import { useTranslation } from "../../../i18n/context";

export const BandwidthChart: Component<{
  points: any[] | undefined;
  title: string;
  type: 'download' | 'upload';
}> = (props) => {
  const { t } = useTranslation();
  let chartInstance: Chart | null = null;
  let resizeObserver: ResizeObserver | null = null;

  const chartData = createMemo(() => {
    if (!props.points?.length) return null;

    const startTime = props.points[0].measTime instanceof Date
      ? props.points[0].measTime.getTime()
      : props.points[0].measTime;

    return props.points.map(point => ({
      x: ((point.measTime instanceof Date ? point.measTime.getTime() : point.measTime) - startTime) / 1000,
      y: point.bps / 1e6
    }));
  });

  const createChart = (canvas: HTMLCanvasElement) => {
    const data = chartData();
    if (!data) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#666';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(t.advancedResults.chart.noDataAvailable(props.type === 'download' ? t.advancedResults.download() : t.advancedResults.upload()), canvas.width / 2, canvas.height / 2);
      }
      return null;
    }

    chartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [
          {
            label: `${props.type === 'download' ? t.advancedResults.download() : t.advancedResults.upload()} (${t.advancedResults.mbps()})`,
            data: data,
            borderColor: CHART_COLORS.primary,
            backgroundColor: CHART_COLORS.primaryRgba(0.1),
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointHoverRadius: 5
          }
        ]
      },
      options: getBandwidthChartConfig(props.title, t.advancedResults.timeSeconds(), t.advancedResults.speedMbps(), t.advancedResults.mbps())
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

  return (
    <div class="h-64 w-full max-w-full overflow-hidden">
      <canvas
        ref={(el) => {
          if (el) {
            setTimeout(() => createChart(el), 100);
          }
        }}
        class="w-full h-full max-w-full"
      ></canvas>
    </div>
  );
};