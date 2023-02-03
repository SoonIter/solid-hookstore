import { Setter, Accessor, JSXElement, Context } from 'solid-js';
import { MountableElement } from 'solid-js/web';

interface ISignal<T> {
    (): T;
    set: Setter<T>;
}
declare function Signal<T>(initialValue: T): ISignal<T>;
declare function Signal<T>(getter: Accessor<T>, setter: Setter<T>): ISignal<T>;

declare class App {
    constructor(Comp: () => JSXElement);
    Comp: () => JSXElement;
    use(Provider: Context<any>["Provider"]): this;
    mount(node: MountableElement): void;
}
declare const createApp: (Comp: () => JSXElement) => App;

declare const createHookStore: () => {
    defineHookStore: <Name extends string, StoreType extends Record<string | number | symbol, any>, Params extends any[]>(name: Name, fn: (...arr: Params) => StoreType) => (...args: Params) => any;
};

declare const createSharedValue: <T>(...GetterSetter: [Accessor<T>, Setter<T>][]) => [Accessor<T>, Setter<T>];

export { ISignal, Signal, createApp, createHookStore, createSharedValue };
