import { Signal } from '@solid-hookstore/basic';
import { createSignal } from 'solid-js';

const useCounter = (initialNum?: number) => {
  const [count, setCount] = createSignal(initialNum ?? 0);
  const inc = () => setCount((v) => v + 1);
  const dec = () => setCount((v) => v - 1);
  return [Signal(count, setCount), { inc, dec, set: setCount }] as const;
};
export default useCounter;
export { useCounter };
