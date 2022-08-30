import { createSignal, Setter } from "solid-js";

const Signal = <T>(initialValue: T) => {
  const [value, setValue] = createSignal<T>(initialValue);
  const accessor: {
    (): T;
    set: Setter<T>;
  } = () => value();

  accessor.set = setValue;
  return accessor;
};
export { Signal };
