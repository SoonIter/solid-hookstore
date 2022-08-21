import { createSignal } from 'solid-js';
const useCounter = (initialNum?: number) => {
  const [count, setCount] = createSignal(initialNum ?? 0);
  const add = () => setCount((v) => v + 1);
  return [count, add];
};
export default useCounter;
