/* @refresh reload */
import './index.css';
import { customElement, noShadowDOM } from 'solid-element';

import App from './App';
import { TranslationProvider } from './i18n/context';

customElement('nb-speedtest', { lang: undefined }, (props) => {
  if (import.meta.env.VITE_DISABLE_SHADOW_DOM) {
    noShadowDOM()
  }
  return (<>
    <link rel="stylesheet" href="/nb-speedtest/index.css" />
    <TranslationProvider locale={props.lang}>
      <App />
    </TranslationProvider>
  </>)
})
