import { Signal } from "@solid-hookstore/basic";
import { createEffect, createSignal } from "solid-js";
const encode = <T>(val: T) => {
  return JSON.stringify(val) ?? "";
};
const decode = <T>(val: string) => {
  return JSON.parse(val) as T;
};

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const local = localStorage.getItem(key);

  const [value, setValue] = createSignal<T>(
    local === null ? initialValue : decode(local)
  );

  createEffect(() => {
    localStorage.setItem(key, encode(value()));
  });

  return [Signal(value, setValue), setValue] as const;
};
export default useLocalStorage;
export { useLocalStorage };
