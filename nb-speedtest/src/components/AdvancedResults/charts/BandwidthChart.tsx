import { Component } from "solid-js";
import { Chart } from 'chart.js';
import { getBandwidthChartConfig, CHART_COLORS } from "../utils/chart-config";

type BandwidthPoint = {
  bytes: number;
  bps: number;
  duration: number;
  ping: number;
  measTime: Date;
  serverTime: number;
  transferSize: number;
};

export const BandwidthChart: Component<{
  points: BandwidthPoint[] | undefined;
  title: string;
  type: 'download' | 'upload';
}> = (props) => {
  const createChart = (canvas: HTMLCanvasElement) => {
    if (!props.points?.length) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#666';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Keine ${props.type === 'download' ? 'Download' : 'Upload'}-Daten verfügbar`, canvas.width / 2, canvas.height / 2);
      }
      return null;
    }

    const startTime = props.points[0].measTime.getTime();
    const data = props.points.map(point => ({
      x: (point.measTime.getTime() - startTime) / 1000,
      y: point.bps / 1e6
    }));

    return new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [
          {
            label: `${props.type === 'download' ? 'Download' : 'Upload'} (Mbit/s)`,
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
      options: getBandwidthChartConfig(props.title)
    });
  };

  return (
    <div class="h-64">
      <canvas
        ref={(el) => {
          if (el) {
            setTimeout(() => createChart(el), 100);
          }
        }}
      ></canvas>
    </div>
  );
};