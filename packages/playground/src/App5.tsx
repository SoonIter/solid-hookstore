import { Show } from 'solid-js';
import { useLocalStorage, useTitle, createSharedValue, createHookStore, Signal } from 'solid-hookstore';
import { createMotionTransform } from '../../createMotionTransform/index';

const { defineHookStore } = createHookStore();
const useStore = defineHookStore('@title', () => {
  const [a, setA] = useLocalStorage('@title', 'title');
  const [b, setB] = useTitle('title');
  const d = Signal('title');
  const [c, setC] = createSharedValue([a, setA], [b, setB], [d, d.set]);
  return d;
});

const App = () => {
  const value = useStore();
  const { Position1, Position2, togglePosition } = createMotionTransform(
    (
      <div>
        <h2>{value()}</h2>
        <h1>11111</h1>
      </div>
    ) as any,
  );
  return (
    <div>
      <Position1 />
      <button onClick={togglePosition}>toggle</button>
      <div>{value()}</div>
      <input
        value={value()}
        onInput={(e) => {
          // @ts-ignore
          value.set(e.target.value);
        }}
      />
      {Position2()}
    </div>
  );
};

export default App;
