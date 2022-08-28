import { Component, createSignal } from 'solid-js';
import useModelValue from '@solid-hookstore/hooks/useModelValue';

const Child: Component<{ value: number; onChange: (value: number) => void }> = (props) => {
  const [a, setA] = useModelValue(props);
  return (
    <div>
      <button onClick={() => setA(a() + 2)}>{a()}</button>
    </div>
  );
};

export default () => {
  const [b, setB] = createSignal(0);
  return (
    <div>
      <div>
        <button onClick={() => setB((b) => b + 1)}>{b}</button>
      </div>
      <Child value={b()} onChange={setB} />
    </div>
  );
};
