import { createSignal } from "solid-js";

function useBoolean(defaultValue: boolean = false) {
  const [show, setShow] = createSignal(defaultValue);
  const setTrue = () => setShow(true);
  const setFalse = () => setShow(false);
  const toggle = () => setShow((v) => !v);

  return [show, { setFalse, setTrue, toggle }] as const;
}
export { useBoolean };
