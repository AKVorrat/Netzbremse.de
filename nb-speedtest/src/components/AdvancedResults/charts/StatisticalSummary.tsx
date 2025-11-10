import { Component } from "solid-js";
import { StatisticalSummary as Stats } from "../utils/statistics";
import { formatLatency } from "../utils/formatting";
import { useTranslation } from "../../../i18n/context";

export const StatisticalSummary: Component<{
  stats: Stats | null;
}> = (props) => {
  const { t } = useTranslation();
  if (!props.stats) return null;

  return (
    <div class="mt-2 text-xs text-base-content/70 grid lg:grid-cols-4 grid-cols-2 gap-1 text-center">
      <span>{t.advancedResults.stats.min()}: {formatLatency(props.stats.min)} {t.advancedResults.ms()}</span>
      <span>{t.advancedResults.stats.max()}: {formatLatency(props.stats.max)} {t.advancedResults.ms()}</span>
      <span>{t.advancedResults.stats.median()}: {formatLatency(props.stats.median)} {t.advancedResults.ms()}</span>
      <span>{t.advancedResults.stats.average()}: {formatLatency(props.stats.mean)} {t.advancedResults.ms()}</span>
    </div>
  );
};