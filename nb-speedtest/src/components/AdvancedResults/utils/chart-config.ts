import { ChartConfiguration } from 'chart.js';

export const getBaseChartOptions = (title: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: title
    },
    legend: {
      display: false
    }
  }
});

export const getBandwidthChartConfig = (title: string): Partial<ChartConfiguration['options']> => ({
  ...getBaseChartOptions(title),
  scales: {
    x: {
      type: 'linear' as const,
      title: {
        display: true,
        text: 'Zeit (Sekunden)'
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Geschwindigkeit (Mbit/s)'
      }
    }
  }
});

export const getLatencyChartConfig = (title: string): Partial<ChartConfiguration['options']> => ({
  ...getBaseChartOptions(title),
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Latenz (ms)'
      }
    },
    y: {
      display: false,
      min: 0.5,
      max: 1.5
    }
  }
});

export const CHART_COLORS = {
  primary: '#e00370',
  primaryRgba: (opacity: number) => `rgba(224, 3, 112, ${opacity})`
} as const;