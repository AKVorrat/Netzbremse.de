import { For, type Component, createSignal, Show } from 'solid-js';
import NBSpeedTest from './SpeedTest';
import { t } from './i18n/dict';
import { Faq } from './Faq';
import { AdvancedResults } from './components/AdvancedResults';
import { Results } from '@cloudflare/speedtest';
import { TestRun } from './data/test-runs';
import { ColsLayout } from './layouts/ColsLayout';
import { Container } from './layouts/Container';

const App: Component = () => {
  const [results, setResults] = createSignal<Results[]>([]);
  const [sessionId, setSessionId] = createSignal<string>('');
  const [testRuns, setTestRuns] = createSignal<TestRun[]>([]);

  return (
    <>
      <div class="bg-primary overflow-auto">
        <Container>
          <ColsLayout breakpoint='xl' class='items-center'>
            <div class=''>
              <h2 class="text-2xl lg:text-4xl text-primary-content text-balance mb-4 lg:mb-6">{t.title()}</h2>
              <For each={t.description()}>
                {(item, index) => (<p class='text-primary-content my-2 lg:my-4 text-lg lg:text-xl prose-invert'>
                  {typeof item === "function" ? item() : item}
                </p>)
                }
              </For>
            </div>
            <div class=''>
              <NBSpeedTest
                onResultsChange={setResults}
                onSessionId={setSessionId}
                onTestRunsChange={setTestRuns}
              />
            </div>
          </ColsLayout>
        </Container>
      </div>

      {/* Advanced Results Section */}

      <Show when={results()?.length > 0}>
        <Container>
          <h2 class="text-2xl lg:text-4xl text-balance mb-4 lg:mb-6 text-center">
            {t.advancedResults.title()}
          </h2>
          <AdvancedResults
            results={results()}
            sessionId={sessionId()}
            testRuns={testRuns()}
          />
        </Container>
      </Show>

      <Container>
        <ColsLayout class="">
          <div class=''>
            <h2 class='text-2xl lg:text-4xl text-balance'>{t.faqTitle()}</h2>
          </div>
          <div class=''>
            <Faq></Faq>
          </div>
        </ColsLayout>
      </Container>
    </>

  );
};

export default App;
