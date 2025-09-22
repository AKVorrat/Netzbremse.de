import { ConfigOptions, Results } from '@cloudflare/speedtest';
import { Component, createEffect, createResource, createSignal, For, Index, indexArray, Match, Show, Switch } from "solid-js";
import { t } from './i18n/dict';
import { PowerBtn } from './components/PowerBtn';
import { Stepper } from './components/Stepper';
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from 'solid-icons/tb';
import { SingleTest } from './components/SingleTest';
import { getTestRuns } from './data/test-runs';
import { v4 as uuidV4 } from "uuid";
import { SingleResult } from './components/SingleResult';
import { Slider } from './components/Slider';

const fetchMetadata = async () => {
  const resp = await fetch("https://speed.cloudflare.com/meta")
  const data = await resp.json();
  return data as { hostname: string, httpProtocol: string, asn: string, asOrganization: string, clientIp: string, colo: string, country: string, city: string, region: string, postalCode: string, latitude: string, longitude: string }
};

const NBSpeedTest: Component<{ onResultsChange?: (r: Results[]) => void, onSessionId?: (id: string) => void }> = (props) => {
  const sessionID = uuidV4()
  const testRuns = getTestRuns(sessionID)

  const [results, setResults] = createSignal<Results[]>([])

  const [started, setStarted] = createSignal(false)
  const [currentTest, setCurrentTest] = createSignal(0)
  const [finished, setFinished] = createSignal(false)
  const [paused, setPaused] = createSignal(false)
  const [repeat, setRepeat] = createSignal(true)

  const [metadata] = createResource(fetchMetadata)

  // Pass sessionId to parent component
  createEffect(() => {
    if (props.onSessionId) {
      props.onSessionId(sessionID)
    }
  })

  const onStartClick = async () => {
    setStarted(true)
  }

  const togglePaused = () => {
    setPaused(!paused())
  }

  const onDone = (currentIndex: number, result: Results) => {
    const newResults = [...results(), result]
    setResults(newResults)
    if (props.onResultsChange) {
      props.onResultsChange(newResults)
    }

    const nextIndex = currentIndex + 1
    if (nextIndex < testRuns.length) {
      setCurrentTest(nextIndex)
    } else {
      console.log("All speedtests finished!")
      setFinished(true)
    }
  }

  const slideIndex = () => {
    if (!started()) {
      return 0
    } else if (!finished()) {
      return 1
    } else {
      return 2
    }
  }

  const resultAt = (index: number) => {
    if (results().length > index) {
      return results()[index]
    }
    return undefined
  }

  const shouldRun = (index: number) => started() && !paused() && currentTest() === index

  return (
    <div class="card bg-white shadow-xl min-w-[65ch]">
      <div class="card-body flex items-center justify-center overflow-hidden">
        <hgroup class='flex flex-col items-center font-title'>
          <h2 class='text-3xl'>
            {t.speedtest.title()}
          </h2>
          <p class='text-title text-lg'>Netzbremse x CloudFlare</p>
        </hgroup>

        <Slider currentIndex={slideIndex()}>
          <div class='h-full flex flex-col'>
            <div class='my-auto'>
              <PowerBtn onClick={onStartClick}></PowerBtn>
            </div>
            <label class="label">
              <input type="checkbox" class="checkbox checkbox-primary" checked={repeat()} onChange={(e) => setRepeat(e.currentTarget.checked)} />
              {t.speedtest.runInBackground()}
            </label>
          </div>

          <div class='w-full h-full flex flex-col'>
            <Stepper step={currentTest()} stepCount={testRuns.length}></Stepper>
            <div class='my-2 mb-auto'></div>
            <Slider currentIndex={currentTest()}>
              <Index each={testRuns}>
                {(item, index) => (
                  <SingleTest label={item().label} config={item().config} run={shouldRun(index)} onDone={(result) => onDone(index, result)}></SingleTest>
                )}
              </Index>
            </Slider>

            <div class='mt-auto w-full flex justify-between items-end px-6'>
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
          </div>

          <div>
            <For each={testRuns}>
              {(run, index) => <SingleResult result={resultAt(index())} label={run.label}></SingleResult>}
            </For>
            <span>Latency/Jitter unter Last gemessen</span>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default NBSpeedTest
