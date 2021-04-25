import { defineCustomElements } from '@ionic/pwa-elements/loader';
import * as React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import App from './components/App';

const history = createBrowserHistory();

render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
);

defineCustomElements(window).catch();
