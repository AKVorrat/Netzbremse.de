import { ChartConfiguration } from 'chart.js';

export const getBaseChartOptions = (title: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: false as false,
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

export const getBandwidthChartConfig = (title: string, xAxisLabel: string, yAxisLabel: string): Partial<ChartConfiguration['options']> => ({
  ...getBaseChartOptions(title),
  plugins: {
    ...getBaseChartOptions(title).plugins,
    tooltip: {
      callbacks: {
        title: () => '',
        label: (context) => `${context.parsed.y.toFixed(2)} Mbit/s`
      }
    }
  },
  scales: {
    x: {
      type: 'linear' as const,
      title: {
        display: true,
        text: xAxisLabel
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: yAxisLabel
      }
    }
  }
});

export const getLatencyChartConfig = (title: string, xAxisLabel: string): Partial<ChartConfiguration['options']> => ({
  ...getBaseChartOptions(title),
  plugins: {
    ...getBaseChartOptions(title).plugins,
    tooltip: {
      callbacks: {
        title: () => '',
        label: (context) => `${context.parsed.x.toFixed(2)} ms`
      }
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: xAxisLabel
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