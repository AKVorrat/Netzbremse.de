/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { customElement, noShadowDOM } from 'solid-element';

import App from './App';

customElement('nb-speedtest', {}, () => {
  //noShadowDOM()
  return (<>
      <link rel="stylesheet" href="/nb-speedtest/index.css"/>
      <App />
    </>)
})
