import { Accessor, createEffect, createSignal, Setter } from 'solid-js';

const createSharedValue = <T>(...GetterSetter: [Accessor<T>, Setter<T>][]) => {
  const [get, set] = createSignal(null as unknown as T);
  const getters = GetterSetter.map((i) => i[0]) as Accessor<T>[];
  const setters = GetterSetter.map((i) => i[1]) as Setter<T>[];
  // initialValue
  const initialValue = getters[0]?.();
  if (initialValue === undefined || GetterSetter.length === 0) {
    console.warn('solid-hookstore-warning:there are not getters.');
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
export { createSharedValue };
