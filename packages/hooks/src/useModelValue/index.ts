import { Signal } from '@solid-hookstore/basic';
import { Accessor, createEffect, createSignal, Setter } from 'solid-js';

function createModelValue<
  T extends PropsType[ValueKey],
  PropsType extends Record<ValueKey, any> & Record<OnChangeKey, any>,
  // @ts-ignore
  ValueKey extends keyof PropsType = 'value',
  // @ts-ignore
  OnChangeKey extends keyof PropsType = 'onChange'
>(
  props: PropsType,
  // @ts-ignore
  valueKey: ValueKey = 'value',
  // @ts-ignore
  onChangeKey: OnChangeKey = 'onChange'
) {
  const [value, setValue] = createSignal<PropsType[ValueKey]>(props[valueKey]);
  createEffect(() => {
    const value = props?.[valueKey];
    setValue(value);
  });
  createEffect(() => {
    props[onChangeKey] && props[onChangeKey]?.(value());
  });
  return [Signal(value, setValue), setValue] as const;
}

export default createModelValue;
export { createModelValue };
