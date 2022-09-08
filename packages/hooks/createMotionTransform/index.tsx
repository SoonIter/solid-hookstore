import { getRect } from "@solid-hookstore/shared";
import { createDeferred, createEffect, onMount, Show } from "solid-js";
import { useBoolean } from "../useToggle";

const createMotionTransform = (refCatcher: HTMLElement) => {
  const prev = { x: 0, y: 0 };
  const [show, { toggle }] = useBoolean(true);
  const x = createDeferred(show, { timeoutMs: 0 });
  const Position1 = () => (
    <Show when={show() === true ? x() : false}>{refCatcher}</Show>
  );
  const Position2 = () => (
    <Show when={show() === true ? false : !x()}>{refCatcher}</Show>
  );

  const move = (
    el: HTMLElement,
    { lastX, lastY }: { lastX: number; lastY: number }
  ) => {
    const { left, top } = getRect(el);
    const dx = lastX - left;
    const dy = lastY - top;
    // 恢复原位
    el!.style.transitionDuration = "0s";
    el!.style.transform = `translate(${dx}px,${dy}px)`;
    requestAnimationFrame(() => {
      // 1s到达新位置
      el!.style.transitionDuration = "1s";
      el!.style.transform = `translate(0px,0px)`;
      prev.x = left;
      prev.y = top;
    });
  };
  onMount(() => {
    refCatcher!.style.transitionDuration = "0s";
  });
  createEffect(() => {
    x();
    move(refCatcher, { lastX: prev.x, lastY: prev.y });
  });

  return { Position1, Position2, togglePosition: toggle };
};

export { createMotionTransform };
