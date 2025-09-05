import { ConfigOptions, Results } from '@cloudflare/speedtest';
import { Component, createResource, createSignal, For, Index, Match, Show, Switch } from "solid-js";
import { t } from './i18n/dict';
import { PowerBtn } from './components/PowerBtn';
import { Stepper } from './components/Stepper';
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from 'solid-icons/tb';
import { SingleTest } from './components/SingleTest';
import { getTestRuns } from './data/test-runs';
import { v4 as uuidV4 } from "uuid";
import { SingleResult } from './components/SingleResult';

const fetchMetadata = async () => {
  const resp = await fetch("https://speed.cloudflare.com/meta")
  const data = await resp.json();
  return data as { hostname: string, httpProtocol: string, asn: string, asOrganization: string, clientIp: string, colo: string, country: string, city: string, region: string, postalCode: string, latitude: string, longitude: string }
};

const NBSpeedTest: Component<{ orResultsChange: (r: Results[]) => void }> = (props) => {
  const sessionID = uuidV4()
  const testRuns = getTestRuns(sessionID)

  const [results, setResults] = createSignal<Results[]>([])

  const [started, setStarted] = createSignal(false)
  const [currentTest, setCurrentTest] = createSignal(0)
  const [finished, setFinished] = createSignal(false)
  const [paused, setPaused] = createSignal(false)
  const [repeat, setRepeat] = createSignal(false)

  const [metadata] = createResource(fetchMetadata)

  const onStartClick = async () => {
    setStarted(true)
  }

  const togglePaused = () => {
    setPaused(!paused())
  }

  const onDone = (currentIndex: number, result: Results) => {
    setResults([...results(), result])
    if (props.orResultsChange) {
      props.orResultsChange(results())
    }

    const nextIndex = currentIndex + 1
    if (nextIndex < testRuns.length) {
      setCurrentTest(nextIndex)
    } else {
      console.log("All speedtests finished!")
      setFinished(true)
    }
  }

  const shouldRun = (index: number) => started() && !paused() && currentTest() === index

  return (
    <div class="card bg-white shadow-xl">
      <div class="card-body flex items-center justify-center overflow-hidden">
        <h2 class='text-3xl'>
          {t.speedtest.title()}
        </h2>

        <div class='my-3 flex max-w-full flex-col justify-center items-center'>
          <Switch>
            <Match when={!started()}>
              <PowerBtn onClick={onStartClick}></PowerBtn>
              <label class="label mt-4">
                <input type="checkbox" class="checkbox checkbox-primary" checked={repeat()} onChange={(e) => setRepeat(e.currentTarget.checked)} />
                {t.speedtest.runInBackground()}
              </label>
            </Match>

            <Match when={started() && !finished()}>
              <Stepper step={currentTest()} stepCount={testRuns.length}></Stepper>
              <div class='w-full overflow-hidden relative'>
                <div class='inline-flex flex-row items-stretch' style={{ width: `${testRuns.length * 100}%`, transform: `translateX(-${currentTest() * 100 / testRuns.length}%)`, transition: "transform 0.5s ease-in-out" }}>
                  <Index each={testRuns}>
                    {(item, index) => (
                      <div class="flex-shrink-0 flex-grow-0 flex flex-col justify-center items-center px-6 my-5" style={{ flex: `0 0 calc(100% / ${testRuns.length})` }}>
                        <SingleTest label={item().label} config={item().config} run={shouldRun(index)} onDone={(result) => onDone(index, result)}></SingleTest>
                      </div>
                    )}
                  </Index>
                </div>
              </div>

              <div class='w-full flex justify-between items-end px-6'>
                <button class='btn btn-circle btn-soft' onClick={togglePaused}>
                  <Switch>
                    <Match when={!paused()}>
                      <TbPlayerPauseFilled />
                      <span class='sr-only'>{t.speedtest.pause()}</span>
                    </Match>
                    <Match when={paused()}>
                      <TbPlayerPlayFilled />
                      <span class='sr-only'>{t.speedtest.resume()}</span>
                    </Match>
                  </Switch>
                </button>

                <div>
                  <Show when={metadata()?.asn && metadata()?.asOrganization}>
                    <span class='prose'>ASN {metadata().asn} ({metadata().asOrganization})</span>
                  </Show>
                </div>
              </div>
            </Match>

            <Match when={finished()}>
              <For each={results()}>
                {(result, index) => <SingleResult result={result} label={testRuns[index()].label}></SingleResult>}
              </For>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default NBSpeedTest
