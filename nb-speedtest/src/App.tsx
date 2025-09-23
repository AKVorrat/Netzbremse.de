import { For, type Component, createSignal } from 'solid-js';
import NBSpeedTest from './SpeedTest';
import { t } from './i18n/dict';
import { Faq } from './Faq';
import { AdvancedResults } from './components/AdvancedResults';
import { Results } from '@cloudflare/speedtest';

const App: Component = () => {
  const [results, setResults] = createSignal<Results[]>([]);
  const [sessionId, setSessionId] = createSignal<string>('');

  return (
    <>
      <div class="bg-primary min-h-[45ch] grid grid-cols-2 items-center gap-40 p-24">
        <div class='max-w-[65ch] justify-self-end'>
          <h2 class="text-4xl text-primary-content text-balance mb-6">{t.title()}</h2>
          <For each={t.description()}>
            {(item, index) => (<p class='text-primary-content my-4 text-xl prose-invert'>
              {typeof item === "function" ? item() : item}
            </p>)
            }
          </For>
        </div>
        <div class='max-w-[65ch] justify-self-stretch'>
          <NBSpeedTest
            onResultsChange={setResults}
            onSessionId={setSessionId}
          />
        </div>
      </div>

      {/* Advanced Results Section */}
      <AdvancedResults
        results={results()}
        sessionId={sessionId()}
      />

      <div class='grid grid-cols-2 gap-40 my-20 mx-20'>
        <div class='p-3 max-w-[65ch] justify-self-end'>
          <h2 class='text-4xl text-balance'>{t.faqTitle()}</h2>
        </div>
        <div class='max-w-[65ch] justify-self-start'>
          <Faq></Faq>
        </div>
      </div>
    </>

  );
};

export default App;
