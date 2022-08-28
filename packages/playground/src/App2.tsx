import { createSharedValue } from 'solid-hookstore';
export default () => {
  const [a, setA] = createSignal(10);
  const [b, setB] = createSignal(100);

  const [c, setC] = createSharedValue([a, setA], [b, setB]);
  return (
    <>
      <div>
        <button onClick={() => setA((c) => c + 1)}>{a}</button>
      </div>
      <div>
        <button onClick={() => setB((c) => c + 2)}>{b}</button>
      </div>
      <div>
        <button onClick={() => setC((c) => c + 3)}>{c}</button>
      </div>
    </>
  );
};
