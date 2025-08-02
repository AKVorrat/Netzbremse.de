import SpeedTest, { ConfigOptions, Results } from '@cloudflare/speedtest';
import { Component, createEffect, createMemo, createResource, createSignal, Index, Match, Show, Switch } from "solid-js";
import { t } from './i18n/dict';
import { PowerBtn } from './components/PowerBtn';
import { Stepper } from './components/Stepper';
import { TbDownload, TbPlayerPauseFilled, TbPlayerPlayFilled, TbUpload } from 'solid-icons/tb';
import { SpeedStat } from './components/SpeedStat';
import { createArray } from './util/arrays';
import { delay } from './util/time';

type ResultsSummary = {
  download?: number,
  upload?: number,
  latency?: number,
  jitter?: number,
  downLoadedLatency?: number,
  downLoadedJitter?: number,
  upLoadedLatency?: number,
  upLoadedJitter?: number,
  packetLoss?: number,
}

const speedTestCount = 5

const devMode = import.meta.env.MODE === 'development';

const fetchMetadata = async () => {
  const resp = await fetch("https://speed.cloudflare.com/meta")
  const data = await resp.json();
  return data as { hostname: string, httpProtocol: string, asn: string, asOrganization: string, clientIp: string, colo: string, country: string, city: string, region: string, postalCode: string, latitude: string, longitude: string }
};

const createSpeedtest = (name: string, options?: ConfigOptions) => {
  const speedtest = new SpeedTest({ autoStart: false, ...options })
  const [running, setRunning] = createSignal(false)
  const [summary, setSummary] = createSignal<ResultsSummary>(undefined)

  speedtest.onRunningChange = setRunning
  speedtest.onResultsChange = (r) => {
    setSummary(speedtest.results.getSummary())
    console.log("results changed", r, speedtest.results.getSummary())
  }

  const run = () => new Promise<void>((res, rej) => {
    speedtest.onFinish = (results) => {
      setSummary(results.getSummary())
      res()
    }
    speedtest.onError = (error) => {
      rej(error)
    }
    speedtest.play()
  })

  return {
    name,
    speedtest,
    running,
    summary,
    run,
  }
}

const createSimulatedSpeedtest = (name: string, options?: ConfigOptions) => {
  const [running, setRunning] = createSignal(false)
  const [summary, setSummary] = createSignal<ResultsSummary>(undefined)
  const speedtest = {
    play: async () => { },
    pause: async () => { },
    reset: async () => { },
  } as any as SpeedTest

  const run = async () => {
    setRunning(true)
    for (let i = 0; i < 30; i++) {
      await delay(1000)
      setSummary({
        download: (Math.random() * 30 + 200) * 1e6,
        downLoadedLatency: Math.random() * 5 + 20,
        upload: undefined,
        upLoadedLatency: undefined,
      })
    }
    const lastDownTest = summary()
    for (let i = 0; i < 30; i++) {
      await delay(1000)
      setSummary({
        download: Math.random() * 1e6 + lastDownTest.download,
        downLoadedLatency: Math.random() * 1 + lastDownTest.downLoadedLatency,
        upload: (Math.random() * 30 + 200) * 1e6,
        upLoadedLatency: Math.random() * 5 + 20,
      })
    }
    setRunning(false)
  }

  return {
    name,
    speedtest,
    summary,
    run,
    running,
  }
}

const NBSpeedTest: Component = () => {
  const [started, setStarted] = createSignal(false)
  const [paused, setPaused] = createSignal(false)
  const [finished, setFinished] = createSignal(false)
  const [currentTest, setCurrentTest] = createSignal(0)
  const [speedtests, setSpeedtests] = createSignal(createArray(speedTestCount, () => devMode ? createSimulatedSpeedtest("Route X") : createSpeedtest("Route X")))
  const [metadata] = createResource(fetchMetadata)

  const running = createMemo(() => {
    for (const speedtest of speedtests()) {
      if (speedtest.running()) {
        return true
      }
    }
    return false
  })

  const onStartClick = async () => {
    setStarted(true)

    createEffect(() => {
      const r = speedtests()[currentTest()].speedtest.results
      if (r) {
        console.log(`results (${currentTest()}/${speedtests().length})`,
          r.getDownloadBandwidth(), r.getDownLoadedLatency(), r.getUploadBandwidth(), r.getUpLoadedLatency(), {
          upB: r.getUploadBandwidthPoints(),
          upL: r.getUpLoadedLatencyPoints(),
          doB: r.getDownloadBandwidthPoints(),
          doL: r.getDownLoadedLatencyPoints(),
          r: r,
        })
      }
    })

    while (currentTest() < speedtests().length) {
      await speedtests()[currentTest()].run()
      setCurrentTest(currentTest() + 1)
    }
    setFinished(true)
  }

  const togglePaused = () => {
    if (paused()) {
      speedtests()[currentTest()].speedtest.play()
    } else {
      speedtests()[currentTest()].speedtest.pause()
    }
    setPaused(!paused())
  }

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
                <input type="checkbox" class="checkbox checkbox-primary" />
                {t.speedtest.runInBackground()}
              </label>
            </Match>

            <Match when={started()}>
              <Stepper step={currentTest()} stepCount={speedtests().length}></Stepper>
              <div class='w-full overflow-hidden relative'>
                <div class='inline-flex flex-row items-stretch' style={{ width: `${speedTestCount * 100}%`, transform: `translateX(-${currentTest() * 100 / speedTestCount}%)`, transition: "transform 0.5s ease-in-out" }}>
                  <Index each={speedtests()}>
                    {(item, index) => (
                      <div class="flex-shrink-0 flex-grow-0 flex flex-col justify-center items-center px-6 my-5" style={{ flex: `0 0 calc(100% / ${speedTestCount})` }}>
                        <div class='flex items-center gap-3'>
                          <span class="loading loading-ring loading-md text-primary"></span>
                          <h3 class='text-2xl'>{ t.speedtest.testing(item().name) }</h3>
                        </div>
                        <div class="stats stats-vertical shadow-md my-3 w-full" aria-hidden={index !== currentTest()}>
                          <SpeedStat speed={item().summary()?.download} latency={item().summary()?.downLoadedLatency} direction='download' />
                          <SpeedStat speed={item().summary()?.upload} latency={item().summary()?.upLoadedLatency} direction='upload' />
                        </div>
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
              Finished
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default NBSpeedTest
