/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { customElement, noShadowDOM } from 'solid-element';

import App from './App';

customElement('nb-speedtest', {}, () => {
  noShadowDOM()
  return (<App />)
})