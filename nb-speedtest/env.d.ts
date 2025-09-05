interface ImportMetaEnv {
  readonly VITE_DISABLE_SHADOW_DOM: string;
  readonly VITE_FAKE_SPEEDTEST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}