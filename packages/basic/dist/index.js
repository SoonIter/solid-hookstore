"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/Signal.ts
var _solidjs = require('solid-js');
function Signal(getter, setter) {
  if (setter === void 0) {
    const [value, setValue] = _solidjs.createSignal.call(void 0, getter);
    const accessor = () => value();
    accessor.set = setValue;
    return accessor;
  }
  getter.set = setter;
  return getter;
}

// src/createApp.ts
var _web = require('solid-js/web');
var App = class {
  constructor(Comp) {
    this.Comp = Comp;
  }
  
  use(Provider) {
    const Comp = this.Comp;
    this.Comp = () => _web.createComponent.call(void 0, Provider, {
      get children() {
        return _web.createComponent.call(void 0, Comp, {});
      }
    });
    return this;
  }
  mount(node) {
    var _a;
    if (!((_a = import.meta) == null ? void 0 : _a.hot)) {
      _web.render.call(void 0, this.Comp, node);
    }
  }
};
var createApp = (Comp) => {
  return new App(Comp);
};

// src/createHookStore.ts

var createHookStore = () => {
  const globalStore = {};
  function defineHookStore(name, fn) {
    return _solidjs.createRoot.call(void 0, () => {
      const store = globalStore;
      if ((store == null ? void 0 : store[name]) !== void 0) {
        return () => store[name];
      }
      return (...args) => store[name] = fn.apply(args);
    });
  }
  return { defineHookStore };
};

// src/createSharedValue.ts

var createSharedValue = (...GetterSetter) => {
  var _a;
  const [get, set] = _solidjs.createSignal.call(void 0, null);
  const getters = GetterSetter.map((i) => i[0]);
  const setters = GetterSetter.map((i) => i[1]);
  const initialValue = (_a = getters[0]) == null ? void 0 : _a.call(getters);
  if (initialValue === void 0 || GetterSetter.length === 0) {
    console.warn("solid-hookstore-warning:there are not getters.");
  }
  set(() => initialValue);
  setters.forEach((s) => s(() => initialValue));
  _solidjs.createEffect.call(void 0, () => {
    setters.forEach((setter) => {
      const sameValue = get();
      setter(() => sameValue);
    });
  });
  for (let getter of getters) {
    _solidjs.createEffect.call(void 0, () => {
      set(() => getter());
    });
  }
  return [get, set];
};





exports.Signal = Signal; exports.createApp = createApp; exports.createHookStore = createHookStore; exports.createSharedValue = createSharedValue;
