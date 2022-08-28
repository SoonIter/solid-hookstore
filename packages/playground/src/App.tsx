import { Component } from 'solid-js';
import { createHookStore } from 'solid-hookstore';
import { useEventListener } from '@solid-hookstore/hooks/useEventListener';

const { defineHookStore } = createHookStore();
const { defineHookStore: define2 } = createHookStore();

const useCountStore = defineHookStore('count', () => {
  const [a, setA] = createSignal(0);
  return {
    a,
    setA,
  };
});
const useCount2Store = define2('count', () => {
  const [b, setB] = createSignal(0);
  return {
    b,
    setB,
  };
});
const App2: Component = () => {
  const { a, setA } = useCountStore();
  const { b, setB } = useCount2Store();
  const [divRefSignal, setSignal] = createSignal<HTMLElement>(null as unknown as HTMLElement);
  let divRef = null as unknown as HTMLDivElement;
  createEffect(() => {
    console.log(divRef);
  });
  useEventListener(
    () => divRef,
    'click',
    () => {
      console.log('hello');
    },
  );
  useEventListener(divRefSignal, 'click', () => {
    console.log('hello');
  });
  return (
    <>
      <div
        ref={divRef}
        onClick={() => {
          setA((a) => a + 1);
        }}
      >
        {a}
      </div>
      <div
        ref={setSignal}
        onClick={() => {
          setB((a) => a + 1);
        }}
      >
        {b}
      </div>
    </>
  );
};
const App: Component = () => {
  const { a, setA } = useCountStore();
  const { b, setB } = useCount2Store();
  return (
    <>
      <div
        onClick={() => {
          setA((a) => a + 1);
        }}
      >
        {a}
      </div>
      <div
        onClick={() => {
          setB((a) => a + 1);
        }}
      >
        {b}
      </div>
    </>
  );
};

export default () => {
  return (
    <>
      <App />
      <App2 />
    </>
  );
};
