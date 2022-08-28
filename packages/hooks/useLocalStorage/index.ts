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

  return [value, setValue] as ReturnType<typeof createSignal<T>>;
};
export default useLocalStorage;
