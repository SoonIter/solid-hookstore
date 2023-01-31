import { createEffect, createSignal, Signal } from "solid-js";

const useTitle = (initialValue?: string) => {
  const [a, setA] = createSignal(initialValue ?? document.title);
  createEffect(() => {
    document.title = a();
  });
  return [a, setA] as Signal<string>;
};
export default useTitle;
export { useTitle };
