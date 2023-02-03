const access = <T>(t: (() => T) | T) => {
  // @ts-ignore
  return (typeof t === 'function' ? t() : t) as T;
};
export { access };
