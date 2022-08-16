import { Link, Route, Routes } from '@solidjs/router';
import { Component, createContext, JSXElement } from 'solid-js';

const createSubTreeHookStore = () => {
  const context = createContext({});
  const HookStoreProvider: Component<{ children: JSXElement }> = (props) => {
    const store = {} as Record<string, any>;
    return <context.Provider value={store}>{props.children}</context.Provider>;
  };
  const defineHookStore = <Name extends string, StoreType extends Record<keyof any, any>>(
    name: Name,
    fn: () => StoreType,
  ) => {
    const globalStore = useContext(context) as Record<Name, StoreType>;
    if (globalStore?.[name] !== undefined) {
      return () => globalStore[name];
    }
    const res = fn();
    globalStore[name] = res;
    return () => globalStore[name];
  };
  return { HookStoreProvider, defineHookStore };
};

const { HookStoreProvider, defineHookStore } = createSubTreeHookStore();
const { HookStoreProvider: Provider2, defineHookStore: define2 } = createSubTreeHookStore();

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
  // if you wanna create some stores that only manage a subtree, you can use the Provider.
  return (
    <HookStoreProvider>
      <Provider2>
        <App />
        <App2 />
      </Provider2>
    </HookStoreProvider>
  );
};
