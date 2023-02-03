import * as solid_js from 'solid-js';
import { Accessor, Setter, Signal } from 'solid-js';
import * as _solid_hookstore_basic from '@solid-hookstore/basic';

declare function useBoolean(defaultValue?: boolean): readonly [solid_js.Accessor<boolean>, {
    readonly setFalse: () => false;
    readonly setTrue: () => true;
    readonly toggle: () => boolean;
}];

declare const useCounter: (initialNum?: number) => readonly [_solid_hookstore_basic.ISignal<number>, {
    readonly inc: () => number;
    readonly dec: () => number;
    readonly set: solid_js.Setter<number>;
}];

declare function useDark(): _solid_hookstore_basic.ISignal<boolean>;

declare type Options = {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
};
declare function useEventListener<K extends keyof HTMLElementEventMap>(target: HTMLElement | (() => HTMLElement) | Accessor<HTMLElement>, eventName: K, handler: (ev: HTMLElementEventMap[K]) => void, options?: Options): void;

declare const useLocalStorage: <T>(key: string, initialValue: T) => readonly [_solid_hookstore_basic.ISignal<T>, solid_js.Setter<T>];

declare function createModelValue<T extends PropsType[ValueKey], PropsType extends Record<ValueKey, any> & Record<OnChangeKey, any>, ValueKey extends keyof PropsType = "value", OnChangeKey extends keyof PropsType = "onChange">(props: PropsType, valueKey?: ValueKey, onChangeKey?: OnChangeKey): readonly [_solid_hookstore_basic.ISignal<PropsType[ValueKey]>, Setter<PropsType[ValueKey]>];

declare const useMouse: (target: HTMLElement) => _solid_hookstore_basic.ISignal<{
    readonly screenX: number;
    readonly screenY: number;
    readonly clientX: number;
    readonly clientY: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly elementX: number;
    readonly elementY: number;
    readonly elementH: number;
    readonly elementW: number;
    readonly elementPosX: number;
    readonly elementPosY: number;
}>;

declare const useTitle: (initialValue?: string) => Signal<string>;

declare function useToggle(defaultValue: boolean, [leftVal, rightVal]: [any, any]): readonly [solid_js.Accessor<boolean>, {
    readonly setLeft: () => boolean;
    readonly setRight: () => boolean;
    readonly toggle: () => boolean;
    readonly val: solid_js.Accessor<any>;
}];

declare const createMotionTransform: (refCatcher: HTMLElement) => {
    Position1: () => solid_js.JSX.Element;
    Position2: () => solid_js.JSX.Element;
    togglePosition: () => boolean;
};

export { createModelValue, createMotionTransform, useBoolean, useCounter, useDark, useEventListener, useLocalStorage, useMouse, useTitle, useToggle };
