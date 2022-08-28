import { createSignal } from 'solid-js';
import useLocalStorage from '@solid-hookstore/hooks/useLocalStorage';
import useTitle from '@solid-hookstore/hooks/useTitle';
import { createHookStore, createSharedValue } from 'solid-hookstore';

const { defineHookStore } = createHookStore();
const useStore = defineHookStore('hello', () => {
  const [a, setA] = useLocalStorage('@hello', 'title');
  const [b, setB] = useTitle('title');

  const [c, setC] = createSharedValue([a, setA], [b, setB]);
  return { value: c, setValue: setC };
});
const App = () => {
  const { value, setValue } = useStore();
  return (
    <div>
      <div>{value()}</div>
      <input
        value={value()}
        onInput={(e) => {
          // @ts-ignore
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default App;
