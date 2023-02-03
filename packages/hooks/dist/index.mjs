// src/useBoolean/index.ts
import { createSignal } from "solid-js";
function useBoolean(defaultValue = false) {
  const [show, setShow] = createSignal(defaultValue);
  const setTrue = () => setShow(true);
  const setFalse = () => setShow(false);
  const toggle = () => setShow((v) => !v);
  return [show, { setFalse, setTrue, toggle }];
}

// src/useCounter/index.ts
import { Signal } from "@solid-hookstore/basic";
import { createSignal as createSignal2 } from "solid-js";
var useCounter = (initialNum) => {
  const [count, setCount] = createSignal2(initialNum ?? 0);
  const inc = () => setCount((v) => v + 1);
  const dec = () => setCount((v) => v - 1);
  return [Signal(count, setCount), { inc, dec, set: setCount }];
};

// src/useDark/index.ts
import { Signal as Signal2 } from "@solid-hookstore/basic";
import { createRenderEffect, on } from "solid-js";
function getDefaultDark() {
  const body = document == null ? void 0 : document.body;
  if (body === void 0)
    return false;
  return body.getAttribute("theme-mode") === "dark";
}
function useDark() {
  const isDark = Signal2(getDefaultDark());
  createRenderEffect(
    on(isDark, (isDark2) => {
      const body = document.body;
      if (isDark2) {
        body.setAttribute("theme-mode", "dark");
      } else {
        body.hasAttribute("theme-mode") && body.removeAttribute("theme-mode");
      }
    })
  );
  return isDark;
}

// src/useEventListener/index.ts
import { createEffect } from "solid-js";

// ../shared/src/access.ts
var access = (t) => {
  return typeof t === "function" ? t() : t;
};

// src/useEventListener/index.ts
function useEventListener(target, eventName, handler, options) {
  createEffect(() => {
    const tar = access(target);
    tar.addEventListener(eventName, handler, options);
    return () => tar.removeEventListener(eventName, handler, options);
  });
}

// src/useLocalStorage/index.ts
import { Signal as Signal3 } from "@solid-hookstore/basic";
import { createEffect as createEffect2, createSignal as createSignal3 } from "solid-js";
var encode = (val) => {
  return JSON.stringify(val) ?? "";
};
var decode = (val) => {
  return JSON.parse(val);
};
var useLocalStorage = (key, initialValue) => {
  const local = localStorage.getItem(key);
  const [value, setValue] = createSignal3(
    local === null ? initialValue : decode(local)
  );
  createEffect2(() => {
    localStorage.setItem(key, encode(value()));
  });
  return [Signal3(value, setValue), setValue];
};

// src/useModelValue/index.ts
import { Signal as Signal4 } from "@solid-hookstore/basic";
import { createEffect as createEffect3, createSignal as createSignal4 } from "solid-js";
function createModelValue(props, valueKey = "value", onChangeKey = "onChange") {
  const [value, setValue] = createSignal4(props[valueKey]);
  createEffect3(() => {
    const value2 = props == null ? void 0 : props[valueKey];
    setValue(value2);
  });
  createEffect3(() => {
    var _a;
    props[onChangeKey] && ((_a = props[onChangeKey]) == null ? void 0 : _a.call(props, value()));
  });
  return [Signal4(value, setValue), setValue];
}

// src/useMouse/index.ts
import { Signal as Signal5 } from "@solid-hookstore/basic";
var initState = {
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
};
var useMouse = (target) => {
  const signal = Signal5(initState);
  useEventListener(target || document, "mousemove", (event) => {
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

// src/useTitle/index.ts
import { createEffect as createEffect4, createSignal as createSignal5 } from "solid-js";
var useTitle = (initialValue) => {
  const [a, setA] = createSignal5(initialValue ?? document.title);
  createEffect4(() => {
    document.title = a();
  });
  return [a, setA];
};

// src/useToggle/index.ts
import { createMemo, createSignal as createSignal6 } from "solid-js";
function useToggle(defaultValue, [leftVal, rightVal]) {
  const [show, setShow] = createSignal6(defaultValue);
  const setLeft = () => setShow(defaultValue);
  const setRight = () => setShow(!defaultValue);
  const toggle = () => setShow((v) => !v);
  const val = createMemo(() => show() === defaultValue ? leftVal : rightVal);
  return [show, { setLeft, setRight, toggle, val }];
}

// src/createMotionTransform/index.tsx
import {
  createComponent,
  createDeferred,
  createEffect as createEffect5,
  onMount,
  Show
} from "solid-js";
import { memo } from "solid-js/web";
function getRect(element) {
  if (element === null || element === void 0)
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  const { top, bottom, left, right, width, height } = element.getBoundingClientRect();
  const scrollTop = window.scrollY;
  return {
    top: top + scrollTop,
    bottom,
    left,
    right,
    width,
    height
  };
}
var createMotionTransform = (refCatcher) => {
  const prev = { x: 0, y: 0 };
  const [show, { toggle }] = useBoolean(true);
  const x = createDeferred(show);
  const Position1 = () => createComponent(Show, {
    get when() {
      return memo(() => show() === true, true)() ? x() : false;
    },
    children: refCatcher
  });
  const Position2 = () => createComponent(Show, {
    get when() {
      return memo(() => show() === true, true)() ? false : !x();
    },
    children: refCatcher
  });
  const move = (el, { lastX, lastY }) => {
    const { left, top } = getRect(el);
    const dx = lastX - left;
    const dy = lastY - top;
    el.style.transitionDuration = "0s";
    el.style.transform = `translate(${dx}px,${dy}px)`;
    requestAnimationFrame(() => {
      el.style.transitionDuration = "1s";
      el.style.transform = `translate(0px,0px)`;
      prev.x = left;
      prev.y = top;
    });
  };
  createEffect5(() => {
    x();
    move(refCatcher, { lastX: prev.x, lastY: prev.y });
  });
  onMount(() => {
    refCatcher.style.transitionDuration = "0s";
    refCatcher.style.transform = `translate(0px,0px)`;
  });
  return { Position1, Position2, togglePosition: toggle };
};
export {
  createModelValue,
  createMotionTransform,
  useBoolean,
  useCounter,
  useDark,
  useEventListener,
  useLocalStorage,
  useMouse,
  useTitle,
  useToggle
};
