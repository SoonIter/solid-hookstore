import { createSignal } from 'solid-js';
import useLocalStorage from '@solid-hookstore/hooks/useLocalStorage';

const App = () => {
  const [a, setA] = useLocalStorage('@key', { value: '123' });
  return (
    <div>
      <div>{a().value}</div>
      <input
        value={a().value}
        onInput={(e) => {
          setA({ value: e.target.value });
        }}
      />
    </div>
  );
};

export default App;
