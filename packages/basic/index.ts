import {
  Accessor,
  createEffect,
  createRoot,
  createSignal,
  Setter,
} from "solid-js";
const createHookStore = () => {
  const globalStore = {};
  const defineHookStore = <
    Name extends string,
    StoreType extends Record<keyof any, any>,
    Params extends any[]
  >(
    name: Name,
    fn: (...arr: Params) => StoreType
  ) => {
    return createRoot(() => {
      // retype
      const store = globalStore as Record<Name, StoreType>;

      if (store?.[name] !== undefined) {
        return () => store[name];
      }
      return (...args: Params) => (store[name] = fn.apply(args));
    });
  };
  return { defineHookStore };
};

const createSharedValue = <T>(...GetterSetter: [Accessor<T>, Setter<T>][]) => {
  const [get, set] = createSignal(null as unknown as T);
  const getters = GetterSetter.map((i) => i[0]) as Accessor<T>[];
  const setters = GetterSetter.map((i) => i[1]) as Setter<T>[];
  // initialValue
  const initialValue = getters[0]?.();
  if (initialValue === undefined || GetterSetter.length === 0) {
    console.warn("solid-hookstore-warning:there are not getters.");
  }
  set(() => initialValue);
  setters.forEach((s) => s(() => initialValue));

  // track c -> setA setB
  createEffect(() => {
    setters.forEach((setter) => {
      const sameValue = get();
      setter(() => sameValue);
    });
  });

  // track a b -> setC
  for (let getter of getters) {
    createEffect(() => {
      set(() => getter());
    });
  }

  return [get, set] as [Accessor<T>, Setter<T>];
};

export { createHookStore, createSharedValue };
