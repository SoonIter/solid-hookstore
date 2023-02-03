import { Signal } from '@solid-hookstore/basic';
import { useMouse } from '@solid-hookstore/hooks';

const App = () => {
  let divEle: { current: null | HTMLDivElement } = { current: null };
  const x = Signal(1223);
  // @ts-ignore
  const mouse = useMouse(divEle.current);
  console.log(mouse);

  console.log(x);

  return (
    // @ts-ignore
    <div ref={divEle.current}>
      {x()}
      <p>
        Client - x: {mouse().clientX}, y: {mouse().clientY}
      </p>
      <p>
        Page - x: {mouse().pageX}, y: {mouse().pageY}
      </p>
      <p>
        Screen - x: {mouse().screenX}, y: {mouse().screenY}
      </p>
    </div>
  );
};

export default App;
