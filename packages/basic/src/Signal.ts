import { Accessor, createSignal, Setter } from "solid-js";

export interface ISignal<T> {
  (): T;
  set: Setter<T>;
}

function Signal<T>(initialValue: T): ISignal<T>;
function Signal<T>(getter: Accessor<T>, setter: Setter<T>): ISignal<T>;
function Signal<T>(getter: Accessor<T> | T, setter?: Setter<T>): ISignal<T> {
  if (setter === undefined) {
    const [value, setValue] = createSignal<T>(getter as T);
    const accessor: ISignal<T> = () => value();
    accessor.set = setValue;
    return accessor;
  }

  (getter as ISignal<T>).set = setter;
  return getter as ISignal<T>;
}
export { Signal };
