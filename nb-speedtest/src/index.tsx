/* @refresh reload */
import './index.css';
import { customElement, noShadowDOM } from 'solid-element';

import App from './App';

customElement('nb-speedtest', {}, () => {
  if (import.meta.env.VITE_DISABLE_SHADOW_DOM) {
    noShadowDOM()
  }
  return (<>
    <link rel="stylesheet" href="/nb-speedtest/index.css" />
    <App />
  </>)
})
