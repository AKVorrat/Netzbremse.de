import SpeedTest, { Results } from '@cloudflare/speedtest';
import { Component, createSignal, Match, Switch } from "solid-js";
import { t } from './i18n/dict';
import { PowerBtn } from './components/PowerBtn';
import { Stepper } from './components/Stepper';


const NBSpeedTest: Component = () => {
  const [step, setStep] = createSignal(0)
  const [running, setRunning] = createSignal(false)
  const [results, setResults] = createSignal<undefined | Results>(undefined)

  const onStartClick = () => {
    const speedtest = new SpeedTest({ autoStart: false })
    speedtest.onFinish = setResults
    speedtest.onResultsChange = () => setResults(speedtest.results)
    speedtest.onRunningChange = setRunning

    //speedtest.play()
    setRunning(true)
    setInterval(() => setStep((step() + 1) % 5), 2000)
  }

  return (
    <div class="card bg-white shadow-xl">
      <div class="card-body flex items-center justify-center">
        <h2 class='text-3xl'>{t.speedtest.title()}</h2>
        <div class='my-3 flex flex-col justify-center items-center'>
          <Switch>
            <Match when={!running()}>
              <PowerBtn onClick={onStartClick}></PowerBtn>
              <label class="label mt-4">
                <input type="checkbox" class="checkbox checkbox-primary" />
                {t.speedtest.runInBackground()}
              </label>
            </Match>
            <Match when={running}>
              <Stepper step={step()} stepCount={5}></Stepper>
              {JSON.stringify(results()?.getSummary(), null, 2)}
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default NBSpeedTest
