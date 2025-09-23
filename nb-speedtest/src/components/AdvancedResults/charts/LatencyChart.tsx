import { Component } from "solid-js";
import { Chart } from 'chart.js';
import { getLatencyChartConfig, CHART_COLORS } from "../utils/chart-config";
import { calculateStats } from "../utils/statistics";
import { StatisticalSummary } from "./StatisticalSummary";

export const LatencyChart: Component<{
  points: number[] | undefined;
  title: string;
  opacity?: number;
}> = (props) => {
  const opacity = props.opacity ?? 0.8;

  const createChart = (canvas: HTMLCanvasElement) => {
    if (!props.points?.length) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#666';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Keine Latenz-Daten verfügbar', canvas.width / 2, canvas.height / 2);
      }
      return null;
    }

    const data = props.points.map((latency) => ({ x: latency, y: 1 }));

    return new Chart(canvas, {
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
      options: getLatencyChartConfig(props.title)
    });
  };

  const stats = calculateStats(props.points);

  return <>
    <div class="h-32">
      <canvas
        ref={(el) => {
          if (el) {
            setTimeout(() => createChart(el), 100);
          }
        }}
      ></canvas>
    </div>
    <StatisticalSummary stats={stats} />
  </>;
};