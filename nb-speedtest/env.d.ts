interface ImportMetaEnv {
  readonly VITE_DISABLE_SHADOW_DOM: string;
  readonly VITE_FAKE_SPEEDTEST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Allow interaction between the speedtest and the controller process
// for running this test automated in a headless browser
interface Window {
  nbSpeedtestOptions?: {
    acceptedPolicy?: boolean
  }
  nbSpeedtestOnResult?: (result: any) => void
  nbSpeedtestOnFinished?: () => void
}
