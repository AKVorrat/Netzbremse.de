/* @refresh reload */
import './index.css';
import { customElement, noShadowDOM } from 'solid-element';

import App from './App';
import { TranslationProvider } from './i18n/context';

customElement('nb-speedtest', {}, () => {
  if (import.meta.env.VITE_DISABLE_SHADOW_DOM) {
    noShadowDOM()
  }
  return (<>
    <link rel="stylesheet" href="/nb-speedtest/index.css" />
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </>)
})
