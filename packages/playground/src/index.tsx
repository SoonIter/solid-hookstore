import { render } from 'solid-js/web';

import './index.css';
import 'virtual:uno.css';

import App from './App5';
import { Router } from '@solidjs/router';

render(
  () => (
    <div m-10 p-10 ring-2>
      <Router>
        <App />
      </Router>
    </div>
  ),
  document.getElementById('root') as HTMLElement,
);
