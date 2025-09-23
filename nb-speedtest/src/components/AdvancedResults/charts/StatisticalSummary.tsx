import { Component } from "solid-js";
import { StatisticalSummary as Stats } from "../utils/statistics";
import { formatLatency } from "../utils/formatting";

export const StatisticalSummary: Component<{
  stats: Stats | null;
}> = (props) => {
  if (!props.stats) return null;

  return (
    <div class="mt-2 text-xs text-base-content/70 grid lg:grid-cols-4 grid-cols-2 gap-1 text-center">
      <span>Min: {formatLatency(props.stats.min)} ms</span>
      <span>Max: {formatLatency(props.stats.max)} ms</span>
      <span>Median: {formatLatency(props.stats.median)} ms</span>
      <span>Durchschnitt: {formatLatency(props.stats.mean)} ms</span>
    </div>
  );
};