import { For, type Component, createSignal, Show } from 'solid-js';
import NBSpeedTest from './SpeedTest';
import { useTranslation } from './i18n/context';
import { Faq } from './Faq';
import { AdvancedResults } from './components/AdvancedResults';
import { TestResult } from './types/test-result';
import { ColsLayout } from './layouts/ColsLayout';
import { Container } from './layouts/Container';
import { PeakHoursInfo } from './components/PeakHoursInfo';

const App: Component = () => {
  const { t } = useTranslation();
  const [allResults, setAllResults] = createSignal<TestResult[]>([]);
  const [sessionId, setSessionId] = createSignal<string>('');

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
              <PeakHoursInfo />
            </div>
            <div class=''>
              <NBSpeedTest
                onStateChange={(state) => {
                  setAllResults(state.allResults);
                  setSessionId(state.sessionId);
                }}
              />
            </div>
          </ColsLayout>
        </Container>
      </div>

      <Show when={allResults()?.length > 0}>
        <Container>
          <h2 class="text-2xl lg:text-4xl text-balance mb-4 lg:mb-6 text-center">
            {t.advancedResults.title()}
          </h2>
          <AdvancedResults
            results={allResults()}
            sessionId={sessionId()}
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
