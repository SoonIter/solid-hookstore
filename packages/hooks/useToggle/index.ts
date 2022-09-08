import { createMemo, createSignal } from "solid-js";

function useToggle(defaultValue: boolean, [leftVal, rightVal]: [any, any]) {
  const [show, setShow] = createSignal(defaultValue);
  const setLeft = () => setShow(defaultValue);
  const setRight = () => setShow(!defaultValue);
  const toggle = () => setShow((v) => !v);
  const val = createMemo(() => (show() === defaultValue ? leftVal : rightVal));
  return [show, { setLeft, setRight, toggle, val }] as const;
}
function useBoolean(defaultValue: boolean = false) {
  const [show, setShow] = createSignal(defaultValue);
  const setTrue = () => setShow(true);
  const setFalse = () => setShow(false);
  const toggle = () => setShow((v) => !v);

  return [show, { setFalse, setTrue, toggle }] as const;
}

export { useBoolean, useToggle };
