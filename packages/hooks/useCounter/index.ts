import { createSignal } from "solid-js";
const useCounter = (initialNum?: number) => {
  const [count, setCount] = createSignal(initialNum ?? 0);
  const add = () => setCount((v) => v + 1);
  const minus = () => setCount((v) => v - 1);
  return [count, { add, minus, mutate: setCount }];
};
export default useCounter;
