import { Results } from "@cloudflare/speedtest";
import { Component, For, Show, createMemo, createSignal } from "solid-js";
import { t } from "../../i18n/dict";
import { TestRun } from "../../data/test-runs";
import { Chart, registerables } from 'chart.js';
import { RouteAccordion } from "./RouteAccordion";

Chart.register(...registerables);

export const AdvancedResults: Component<{
  results: Results[],
  sessionId: string,
  testRuns: TestRun[]
}> = (props) => {
  const [openAccordions, setOpenAccordions] = createSignal<Set<number>>(new Set());

  const toggleAccordion = (index: number) => {
    setOpenAccordions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const resultSummary = createMemo(() => {
    return props.results.map((result, index) => {
      const testRun = props.testRuns[index];
      return {
        route: testRun?.label || `Route ${index + 1}`,
        server: testRun?.config.downloadApiUrl?.replace('/__down', '') || '',
        summary: result.getSummary(),
        result,
        // Add stable keys for better reconciliation
        key: `${props.sessionId}-${index}-${testRun?.label || index}`
      };
    });
  });

  const exportData = () => {
    const data = {
      sessionId: props.sessionId,
      timestamp: new Date().toISOString(),
      results: resultSummary().map(r => ({
        route: r.route,
        server: r.server,
        downloadSpeed: r.summary.download,
        uploadSpeed: r.summary.upload,
        loadedLatencyDown: r.summary.downLoadedLatency,
        loadedLatencyUp: r.summary.upLoadedLatency,
        jitterDown: r.summary.downLoadedJitter,
        jitterUp: r.summary.upLoadedJitter
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speedtest-results-${props.sessionId.slice(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Show when={props.results.length > 0}>
      <div class='my-10 lg:my-20 mx-6 lg:mx-20'>
        <h2 class="text-2xl lg:text-4xl text-balance mb-4 lg:mb-6 text-center">
          {t.advancedResults.title()}
        </h2>

        {/* Route Results Accordion - Full Width */}
        <div class="max-w-full lg:max-w-[130ch] mx-auto space-y-2">
          <For each={resultSummary()}>
            {(routeData, index) => (
              <RouteAccordion
                routeData={routeData}
                index={index()}
                isOpen={openAccordions().has(index())}
                onToggle={() => toggleAccordion(index())}
              />
            )}
          </For>
        </div>
      </div>
    </Show>
  );
};