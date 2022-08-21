const createHookStore = () => {
  const defineHookStore = <Name extends string, StoreType extends Record<keyof any, any>>(
    name: Name,
    fn: () => StoreType,
  ) => {
    const globalStore = {} as Record<Name, StoreType>;
    if (globalStore?.[name] !== undefined) {
      return () => globalStore[name];
    }
    const res = fn();
    globalStore[name] = res;
    return () => globalStore[name];
  };
  return { defineHookStore };
};

export { createHookStore }
