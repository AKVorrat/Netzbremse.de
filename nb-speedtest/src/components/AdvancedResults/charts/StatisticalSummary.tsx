import { Component } from "solid-js";
import { StatisticalSummary as Stats } from "../utils/statistics";
import { formatLatencyDisplay } from "../../../util/format-latency";
import { useTranslation } from "../../../i18n/context";

export const StatisticalSummary: Component<{
  stats: Stats | null;
}> = (props) => {
  const { t } = useTranslation();
  if (!props.stats) return null;

  return (
    <div class="mt-2 text-xs text-base-content/70 grid lg:grid-cols-4 grid-cols-2 gap-1 text-center">
      <span>{t.advancedResults.stats.min()}: {formatLatencyDisplay(props.stats.min)} {t.advancedResults.ms()}</span>
      <span>{t.advancedResults.stats.max()}: {formatLatencyDisplay(props.stats.max)} {t.advancedResults.ms()}</span>
      <span>{t.advancedResults.stats.median()}: {formatLatencyDisplay(props.stats.median)} {t.advancedResults.ms()}</span>
      <span>{t.advancedResults.stats.average()}: {formatLatencyDisplay(props.stats.mean)} {t.advancedResults.ms()}</span>
    </div>
  );
};