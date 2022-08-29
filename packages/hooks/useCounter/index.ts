import { createSignal } from "solid-js";
import { Accessor } from "solid-js";

const useCounter = (initialNum?: number) => {
  const [count, setCount] = createSignal(initialNum ?? 0);
  const inc = () => setCount((v) => v + 1);
  const dec = () => setCount((v) => v - 1);
  return [count, { inc, dec, set: setCount }] as [
    Accessor<number>,
    { inc: typeof inc; dec: typeof dec; set: typeof setCount }
  ];
};
export default useCounter;
export { useCounter };
