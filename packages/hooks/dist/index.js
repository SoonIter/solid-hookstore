"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }// src/useBoolean/index.ts
var _solidjs = require('solid-js');
function useBoolean(defaultValue = false) {
  const [show, setShow] = _solidjs.createSignal.call(void 0, defaultValue);
  const setTrue = () => setShow(true);
  const setFalse = () => setShow(false);
  const toggle = () => setShow((v) => !v);
  return [show, { setFalse, setTrue, toggle }];
}

// src/useCounter/index.ts
var _basic = require('@solid-hookstore/basic');

var useCounter = (initialNum) => {
  const [count, setCount] = _solidjs.createSignal.call(void 0, _nullishCoalesce(initialNum, () => ( 0)));
  const inc = () => setCount((v) => v + 1);
  const dec = () => setCount((v) => v - 1);
  return [_basic.Signal.call(void 0, count, setCount), { inc, dec, set: setCount }];
};

// src/useDark/index.ts


function getDefaultDark() {
  const body = document == null ? void 0 : document.body;
  if (body === void 0)
    return false;
  return body.getAttribute("theme-mode") === "dark";
}
function useDark() {
  const isDark = _basic.Signal.call(void 0, getDefaultDark());
  _solidjs.createRenderEffect.call(void 0, 
    _solidjs.on.call(void 0, isDark, (isDark2) => {
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


// ../shared/src/access.ts
var access = (t) => {
  return typeof t === "function" ? t() : t;
};

// src/useEventListener/index.ts
function useEventListener(target, eventName, handler, options) {
  _solidjs.createEffect.call(void 0, () => {
    const tar = access(target);
    tar.addEventListener(eventName, handler, options);
    return () => tar.removeEventListener(eventName, handler, options);
  });
}

// src/useLocalStorage/index.ts


var encode = (val) => {
  return _nullishCoalesce(JSON.stringify(val), () => ( ""));
};
var decode = (val) => {
  return JSON.parse(val);
};
var useLocalStorage = (key, initialValue) => {
  const local = localStorage.getItem(key);
  const [value, setValue] = _solidjs.createSignal.call(void 0, 
    local === null ? initialValue : decode(local)
  );
  _solidjs.createEffect.call(void 0, () => {
    localStorage.setItem(key, encode(value()));
  });
  return [_basic.Signal.call(void 0, value, setValue), setValue];
};

// src/useModelValue/index.ts


function createModelValue(props, valueKey = "value", onChangeKey = "onChange") {
  const [value, setValue] = _solidjs.createSignal.call(void 0, props[valueKey]);
  _solidjs.createEffect.call(void 0, () => {
    const value2 = props == null ? void 0 : props[valueKey];
    setValue(value2);
  });
  _solidjs.createEffect.call(void 0, () => {
    var _a;
    props[onChangeKey] && ((_a = props[onChangeKey]) == null ? void 0 : _a.call(props, value()));
  });
  return [_basic.Signal.call(void 0, value, setValue), setValue];
}

// src/useMouse/index.ts

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
  const signal = _basic.Signal.call(void 0, initState);
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

var useTitle = (initialValue) => {
  const [a, setA] = _solidjs.createSignal.call(void 0, _nullishCoalesce(initialValue, () => ( document.title)));
  _solidjs.createEffect.call(void 0, () => {
    document.title = a();
  });
  return [a, setA];
};

// src/useToggle/index.ts

function useToggle(defaultValue, [leftVal, rightVal]) {
  const [show, setShow] = _solidjs.createSignal.call(void 0, defaultValue);
  const setLeft = () => setShow(defaultValue);
  const setRight = () => setShow(!defaultValue);
  const toggle = () => setShow((v) => !v);
  const val = _solidjs.createMemo.call(void 0, () => show() === defaultValue ? leftVal : rightVal);
  return [show, { setLeft, setRight, toggle, val }];
}

// src/createMotionTransform/index.tsx







var _web = require('solid-js/web');
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
  const x = _solidjs.createDeferred.call(void 0, show);
  const Position1 = () => _solidjs.createComponent.call(void 0, _solidjs.Show, {
    get when() {
      return _web.memo.call(void 0, () => show() === true, true)() ? x() : false;
    },
    children: refCatcher
  });
  const Position2 = () => _solidjs.createComponent.call(void 0, _solidjs.Show, {
    get when() {
      return _web.memo.call(void 0, () => show() === true, true)() ? false : !x();
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
  _solidjs.createEffect.call(void 0, () => {
    x();
    move(refCatcher, { lastX: prev.x, lastY: prev.y });
  });
  _solidjs.onMount.call(void 0, () => {
    refCatcher.style.transitionDuration = "0s";
    refCatcher.style.transform = `translate(0px,0px)`;
  });
  return { Position1, Position2, togglePosition: toggle };
};











exports.createModelValue = createModelValue; exports.createMotionTransform = createMotionTransform; exports.useBoolean = useBoolean; exports.useCounter = useCounter; exports.useDark = useDark; exports.useEventListener = useEventListener; exports.useLocalStorage = useLocalStorage; exports.useMouse = useMouse; exports.useTitle = useTitle; exports.useToggle = useToggle;
