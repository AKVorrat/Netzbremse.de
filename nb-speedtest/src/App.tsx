import { For, type Component, createSignal } from 'solid-js';
import NBSpeedTest from './SpeedTest';
import { t } from './i18n/dict';
import { Faq } from './Faq';
import { AdvancedResults } from './components/AdvancedResults';
import { Results } from '@cloudflare/speedtest';
import { TestRun } from './data/test-runs';

const App: Component = () => {
  const [results, setResults] = createSignal<Results[]>([]);
  const [sessionId, setSessionId] = createSignal<string>('');
  const [testRuns, setTestRuns] = createSignal<TestRun[]>([]);

  return (
    <>
      <div class="bg-primary min-h-[45ch] grid grid-cols-1 xl:grid-cols-2 items-center gap-8 xl:gap-40 p-6 xl:p-24">
        <div class='max-w-[65ch] lg:justify-self-end'>
          <h2 class="text-2xl lg:text-4xl text-primary-content text-balance mb-4 lg:mb-6">{t.title()}</h2>
          <For each={t.description()}>
            {(item, index) => (<p class='text-primary-content my-2 lg:my-4 text-lg lg:text-xl prose-invert'>
              {typeof item === "function" ? item() : item}
            </p>)
            }
          </For>
        </div>
        <div class='w-full max-w-none lg:max-w-[65ch] lg:justify-self-stretch'>
          <NBSpeedTest
            onResultsChange={setResults}
            onSessionId={setSessionId}
            onTestRunsChange={setTestRuns}
          />
        </div>
      </div>

      {/* Advanced Results Section */}
      <AdvancedResults
        results={results()}
        sessionId={sessionId()}
        testRuns={testRuns()}
      />

      <div class='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-40 my-10 lg:my-20 mx-6 lg:mx-20'>
        <div class='p-3 max-w-[65ch] lg:justify-self-end'>
          <h2 class='text-2xl lg:text-4xl text-balance'>{t.faqTitle()}</h2>
        </div>
        <div class='max-w-[65ch] lg:justify-self-start'>
          <Faq></Faq>
        </div>
      </div>
    </>

  );
};

export default App;
