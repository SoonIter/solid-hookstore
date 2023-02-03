import { createRoot } from 'solid-js';

const createHookStore = () => {
  const globalStore = {};

  function defineHookStore<
    Name extends string,
    StoreType extends Record<keyof any, any>,
    Params extends any[]
  >(name: Name, fn: (...arr: Params) => StoreType) {
    return createRoot(() => {
      // retype
      const store = globalStore as Record<Name, StoreType>;

      if (store?.[name] !== undefined) {
        return () => store[name] as StoreType;
      }
      return (...args: Params) => (store[name] = fn.apply(args));
    });
  }
  return { defineHookStore };
};

export { createHookStore };
