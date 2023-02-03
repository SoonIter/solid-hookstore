import { Signal } from '@solid-hookstore/basic';
import { useEventListener } from '../useEventListener';
import { reconcile } from 'solid-js/store';

const initState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN,
  elementX: NaN,
  elementY: NaN,
  elementH: NaN,
  elementW: NaN,
  elementPosX: NaN,
  elementPosY: NaN
} as const;

const useMouse = (target: HTMLElement) => {
  const signal = Signal(initState);
  // @ts-ignore
  useEventListener(target || document, 'mousemove', (event: MouseEvent) => {
    const { screenX, screenY, clientX, clientY, pageX, pageY } = event;
    const newState = {
      screenX,
      screenY,
      clientX,
      clientY,
      pageX,
      pageY,
      elementX: NaN,
      elementY: NaN,
      elementH: NaN,
      elementW: NaN,
      elementPosX: NaN,
      elementPosY: NaN
    };
    const targetElement = target;
    if (targetElement) {
      const { left, top, width, height } = targetElement.getBoundingClientRect();
      newState.elementPosX = left + window.pageXOffset;
      newState.elementPosY = top + window.pageYOffset;
      newState.elementX = pageX - newState.elementPosX;
      newState.elementY = pageY - newState.elementPosY;
      newState.elementW = width;
      newState.elementH = height;
    }
    signal.set(newState);
  });
  return signal;
};
export { useMouse };
