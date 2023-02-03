// src/Signal.ts
import { createSignal } from "solid-js";
function Signal(getter, setter) {
  if (setter === void 0) {
    const [value, setValue] = createSignal(getter);
    const accessor = () => value();
    accessor.set = setValue;
    return accessor;
  }
  getter.set = setter;
  return getter;
}

// src/createApp.ts
import { render, createComponent } from "solid-js/web";
var App = class {
  constructor(Comp) {
    this.Comp = Comp;
  }
  Comp;
  use(Provider) {
    const Comp = this.Comp;
    this.Comp = () => createComponent(Provider, {
      get children() {
        return createComponent(Comp, {});
      }
    });
    return this;
  }
  mount(node) {
    var _a;
    if (!((_a = import.meta) == null ? void 0 : _a.hot)) {
      render(this.Comp, node);
    }
  }
};
var createApp = (Comp) => {
  return new App(Comp);
};

// src/createHookStore.ts
import { createRoot } from "solid-js";
var createHookStore = () => {
  const globalStore = {};
  function defineHookStore(name, fn) {
    return createRoot(() => {
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
import { createEffect, createSignal as createSignal2 } from "solid-js";
var createSharedValue = (...GetterSetter) => {
  var _a;
  const [get, set] = createSignal2(null);
  const getters = GetterSetter.map((i) => i[0]);
  const setters = GetterSetter.map((i) => i[1]);
  const initialValue = (_a = getters[0]) == null ? void 0 : _a.call(getters);
  if (initialValue === void 0 || GetterSetter.length === 0) {
    console.warn("solid-hookstore-warning:there are not getters.");
  }
  set(() => initialValue);
  setters.forEach((s) => s(() => initialValue));
  createEffect(() => {
    setters.forEach((setter) => {
      const sameValue = get();
      setter(() => sameValue);
    });
  });
  for (let getter of getters) {
    createEffect(() => {
      set(() => getter());
    });
  }
  return [get, set];
};
export {
  Signal,
  createApp,
  createHookStore,
  createSharedValue
};
