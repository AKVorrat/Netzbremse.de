import { Results } from '@cloudflare/speedtest';
import { Component, createEffect, createResource, createSignal, For, Match, Show, Switch, onCleanup } from "solid-js";
import { t } from './i18n/dict';
import { PowerBtn } from './components/PowerBtn';
import { Stepper } from './components/Stepper';
import { TbPlayerPauseFilled, TbPlayerPlayFilled, TbRotate2 } from 'solid-icons/tb';
import { SingleTest } from './components/SingleTest';
import { getTestRuns, TestRun } from './data/test-runs';
import { v4 as uuidV4 } from "uuid";
import { SingleResult } from './components/SingleResult';
import { Slider } from './components/Slider';
import { differenceInSeconds } from "date-fns";
import { config } from './data/config';
import { AllResults } from './components/Results';

const fetchMetadata = async () => {
  const resp = await fetch("https://speed.cloudflare.com/meta")
  const data = await resp.json();
  return data as { hostname: string, httpProtocol: string, asn: string, asOrganization: string, clientIp: string, colo: string, country: string, city: string, region: string, postalCode: string, latitude: string, longitude: string }
};

const NBSpeedTest: Component<{ onResultsChange?: (r: Results[]) => void, onSessionId?: (id: string) => void, onTestRunsChange?: (runs: TestRun[]) => void }> = (props) => {
  const sessionID = uuidV4()
  const [testRuns, setTestRuns] = createSignal(getTestRuns(sessionID))

  const [results, setResults] = createSignal<Results[]>([])

  const [started, setStarted] = createSignal(false)
  const [currentTest, setCurrentTest] = createSignal(0)
  const [finished, setFinished] = createSignal<null | Date>(null)
  const [paused, setPaused] = createSignal(false)
  const [repeat, setRepeat] = createSignal(true)
  const [now, setNow] = createSignal(new Date())

  const interval = setInterval(() => {
    setNow(new Date())
  }, 1000)

  onCleanup(() => {
    clearInterval(interval)
  })

  // const [metadata] = createResource(fetchMetadata)

  const restart = () => {
    setTestRuns(getTestRuns(sessionID))
    setResults([])
    setCurrentTest(0)
    setFinished(null)
    setPaused(false)
    setStarted(true)
  }

  props.onSessionId?.(sessionID)
  createEffect(() =>
    props.onTestRunsChange?.(testRuns())
  )
  createEffect(() =>
    props.onResultsChange?.(results())
  )

  const onStartClick = async () => {
    setStarted(true)
  }

  const togglePaused = () => {
    setPaused(!paused())
  }

  const onDone = (currentIndex: number, result: Results) => {
    const newResults = [...results(), result]
    setResults(newResults)

    const nextIndex = currentIndex + 1
    if (nextIndex < testRuns().length) {
      setCurrentTest(nextIndex)
    } else {
      console.log("All speedtests finished!")
      setFinished(new Date())
      setTimeout(restart, config.repeatIntervalSec * 1000)
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

  const autoRestartInFormatted = (): string | undefined => {
    if (!finished()) {
      return undefined
    }
    const secSinceFinished = differenceInSeconds(now(), finished())
    let timeToRestart = config.repeatIntervalSec - secSinceFinished
    if (timeToRestart < 0) {
      return undefined
    }
    const seconds = timeToRestart % 60
    timeToRestart = Math.floor(timeToRestart / 60)
    const minutes = timeToRestart % 60
    const hours = Math.floor(timeToRestart / 60)
    const f = Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 })
    return hours ?
      `${hours}:${f.format(minutes)}:${f.format(seconds)}` :
      `${f.format(minutes)}:${f.format(seconds)}`
  }

  const labels = () => testRuns().map(r => r.label)

  const shouldRun = (index: number) => started() && !paused() && currentTest() === index

  return (<>
    <div class="card bg-white shadow-xl @container">
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
            <Stepper step={currentTest()} stepCount={testRuns().length}></Stepper>
            <div class='my-2 mb-auto'></div>
            <Slider currentIndex={currentTest()}>
              <For each={testRuns()}>
                {(item, index) => (
                  <SingleTest label={item.label} config={item.config} run={shouldRun(index())} onDone={(result) => onDone(index(), result)}></SingleTest>
                )}
              </For>
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

              { /* <div>
                <Show when={metadata()?.asn && metadata()?.asOrganization}>
                  <span class='prose'>ASN {metadata().asn} ({metadata().asOrganization})</span>
                </Show>
              </div> */ }
            </div>
          </div>

          <AllResults results={results()} labels={labels()}></AllResults>
        </Slider>
      </div>
    </div>
    <div class='flex flex-row justify-center items-center mt-3 min-h-10 text-primary-content'>
      <Show when={!!finished()}>
        <button title={t.speedtest.restart()} class='btn btn-circle btn-ghost hover:text-primary focus:text-primary focus:bg-primary-content text-3xl mr-3' onclick={restart}>
          <TbRotate2></TbRotate2>
          <span class='sr-only'>{t.speedtest.restart()}</span>
        </button>
        <Show when={autoRestartInFormatted() && repeat()}>
          Test started automatisch neu in
          <span class='ml-2 min-w-12'>{autoRestartInFormatted()}</span>
        </Show>
      </Show>
    </div>
  </>)
}

export default NBSpeedTest
