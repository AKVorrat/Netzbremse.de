import { Component, Index, Show } from "solid-js";
import { TestResult } from "../../types/test-result";
import { Chart, registerables } from 'chart.js';
import { RouteAccordion } from "./RouteAccordion";
import { ErrorAccordion } from "./ErrorAccordion";
import { ColsLayout } from "../../layouts/ColsLayout";

Chart.register(...registerables);

export const AdvancedResults: Component<{
  results: TestResult[],
  sessionId: string
}> = (props) => {
  return <>
    <ColsLayout>
      <div class="lg:col-span-2 space-y-3">
        <Index each={props.results}>
          {(result) => (
            <Show when={result().success} fallback={
              <ErrorAccordion testResult={result() as TestResult & { success: false }} />
            }>
              <RouteAccordion testResult={result() as TestResult & { success: true }} />
            </Show>
          )}
        </Index>
      </div>
    </ColsLayout>
  </>;
};
