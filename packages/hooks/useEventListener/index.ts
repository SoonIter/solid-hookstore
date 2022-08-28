import { Accessor, createEffect, Ref } from "solid-js";
import { access } from "@solid-hookstore/shared";

type ElementType = HTMLElement | Element | Window | Document;

type ElementEventMapType =
  | HTMLElementEventMap
  | ElementEventMap
  | WindowEventMap
  | DocumentEventMap;

type createUseEventListener<
  T extends ElementType,
  EventMap extends ElementEventMapType
> = <K extends keyof EventMap>(
  target: T | (() => T) | Accessor<T>,
  eventName: K,
  handler: (ev: EventMap[K]) => void,
  options?: Options
) => void;

type Options = {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

// const useEventListener: createUseEventListener<
//   HTMLElement,
//   HTMLElementEventMap
// > = (target, eventName, handler, options) => {
//   createEffect(() => {
//     target && access(target).addEventListener(eventName, handler, options);
//     return () =>
//       access(target).removeEventListener(eventName, handler, options);
//   });
// };

function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | (() => HTMLElement) | Accessor<HTMLElement>,
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
