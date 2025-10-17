import { Results } from "@cloudflare/speedtest";
import { Component, createMemo, Index } from "solid-js";
import { TestRun } from "../../data/test-runs";
import { Chart, registerables } from 'chart.js';
import { RouteAccordion } from "./RouteAccordion";
import { ColsLayout } from "../../layouts/ColsLayout";

Chart.register(...registerables);

export const AdvancedResults: Component<{
  results: Results[],
  sessionId: string,
  testRuns: TestRun[]
}> = (props) => {
  const resultSummary = createMemo(() => {
    return props.results.map((result, index) => {
      const testRun = props.testRuns[index];
      return {
        route: testRun?.label,
        result,
      };
    });
  });

  return <>
    <ColsLayout>
      <div class="lg:col-span-2 space-y-3">
        <Index each={resultSummary()}>
          {(routeData, index) => (
            <RouteAccordion
              routeData={routeData()}
            />
          )}
        </Index>
      </div>
    </ColsLayout>
  </>;
};
