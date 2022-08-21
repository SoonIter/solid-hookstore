import { createEffect, Ref } from "solid-js";
import { access } from "@solid-hookstore/shared";

type ElementType = HTMLElement | Element | Window | Document;

type Options = {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | (() => HTMLElement),
  eventName: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: Options
): void {
  createEffect(() => {
    target && access(target).addEventListener(eventName, handler, options);
    return () =>
      access(target).removeEventListener(eventName, handler, options);
  });
}
export { useEventListener };
