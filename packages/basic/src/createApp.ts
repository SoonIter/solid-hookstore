import { MountableElement, render, createComponent } from "solid-js/web";
import { Context, JSXElement } from "solid-js";
class App {
  constructor(Comp: () => JSXElement) {
    this.Comp = Comp;
  }
  Comp: () => JSXElement;
  use(Provider: Context<any>["Provider"]) {
    const Comp = this.Comp;
    this.Comp = () =>
      // @ts-ignore
      createComponent(Provider, {
        get children() {
          return createComponent(Comp, {});
        },
      });
    return this;
  }
  mount(node: MountableElement) {
    // @ts-ignore
    if (!import.meta?.hot) {
      render(this.Comp, node);
    }
  }
}
const createApp = (Comp: () => JSXElement) => {
  return new App(Comp);
};
export { createApp };
