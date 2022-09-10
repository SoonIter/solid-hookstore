import { createApp } from '@solid-hookstore/basic';

import './index.css';
import 'virtual:uno.css';

import App from './App6';
import { Router } from '@solidjs/router';

const CounterContext = createContext(100000);

export function CounterProvider(props: any) {
  return <CounterContext.Provider value={123}>{props.children}</CounterContext.Provider>;
}
const AppIndex = () => {
  const count = useContext(CounterContext);
  console.log(count);
  return (
    <div m-10 p-10 ring-2>
      <Router>
        <App />
      </Router>
    </div>
  );
};

createApp(AppIndex)
  .use(CounterProvider)
  .mount(document.getElementById('root') as HTMLElement);
// render(AppIndex, document.getElementById('root')!);
