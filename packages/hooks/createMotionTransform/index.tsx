import {
  createComponent,
  createDeferred,
  createEffect,
  onMount,
  Show,
} from "solid-js";
import { memo } from "solid-js/web";
import { useBoolean } from "../useBoolean";

function getRect(element: HTMLElement | null | undefined) {
  if (element === null || element === undefined)
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
    };
  const { top, bottom, left, right, width, height } =
    element.getBoundingClientRect();
  const scrollTop = window.scrollY;
  return {
    top: top + scrollTop,
    bottom,
    left,
    right,
    width,
    height,
  };
}
const createMotionTransform = (refCatcher: HTMLElement) => {
  const prev = { x: 0, y: 0 };
  const [show, { toggle }] = useBoolean(true);
  const x = createDeferred(show);
  const Position1 = () =>
    createComponent(Show, {
      get when() {
        return memo(() => show() === true, true)() ? x() : false;
      },

      children: refCatcher,
    });

  const Position2 = () =>
    createComponent(Show, {
      get when() {
        return memo(() => show() === true, true)() ? false : !x();
      },

      children: refCatcher,
    });

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

  createEffect(() => {
    x();
    move(refCatcher, { lastX: prev.x, lastY: prev.y });
  });

  onMount(() => {
    refCatcher!.style.transitionDuration = "0s";
    refCatcher!.style.transform = `translate(0px,0px)`;
  });

  return { Position1, Position2, togglePosition: toggle };
};

export { createMotionTransform };
