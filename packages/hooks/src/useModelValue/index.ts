import { Signal, ISignal } from '@solid-hookstore/basic';
import { createEffect, createSignal } from 'solid-js';
import { access } from '@solid-hookstore/shared';

function createModelValue<
  PropsType extends Record<ValueKey, any> & Record<OnChangeKey, Function>,
  ValueKey extends string,
  OnChangeKey extends string = 'onChange'
>(props: PropsType, valueKey: ValueKey, onChangeKey: OnChangeKey) {
  valueKey = valueKey ?? 'value';
  onChangeKey = onChangeKey ?? 'onChange';
  const [value, setValue] = createSignal<PropsType[ValueKey]>(props[valueKey]);
  createEffect(() => {
    const value = props?.[valueKey];
    // @ts-ignore
    setValue(value);
  });
  createEffect(() => {
    // @ts-ignore
    props?.[onChangeKey]?.(value());
  });
  return [Signal(value, setValue), setValue] as const;
}

export default createModelValue;
export { createModelValue };
