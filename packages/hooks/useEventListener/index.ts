import { Accessor, createEffect, Ref } from "solid-js";
import { access } from "@solid-hookstore/shared";

type Options = {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | (() => HTMLElement) | Accessor<HTMLElement>,
  eventName: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: Options
): void {
  createEffect(() => {
    const tar = access(target);
    tar.addEventListener(eventName, handler, options);
    return () => tar.removeEventListener(eventName, handler, options);
  });
}
export { useEventListener };
