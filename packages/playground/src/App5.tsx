import { useLocalStorage, useTitle } from '@solid-hookstore/hooks';
import { createSharedValue, createHookStore, Signal } from '@solid-hookstore/basic';

const { defineHookStore } = createHookStore();
const useStore = defineHookStore('@title', () => {
  const [a, setA] = useLocalStorage('@title', 'title');
  const [b, setB] = useTitle('title');
  const d = Signal('title');
  const [c, setC] = createSharedValue([a, setA], [b, setB], [d, d.set]);
  // const [c,setC] = createSignal()

  return d;
});
// const App = () => {
//   const [c, setC] = useStore();
//   return (
//     <div>
//       <div>{c()}</div>
//       <input
//         value={c()}
//         onInput={(e) => {
//           // @ts-ignore
//           console.log(e.target.value);
//           setC(e.target.value);
//         }}
//       />
//     </div>
//   );
// };
const App = () => {
  const value = useStore();
  return (
    <div>
      <div>{value()}</div>
      <input
        value={value()}
        onInput={(e) => {
          // @ts-ignore
          value.set(e.target.value);
        }}
      />
    </div>
  );
};

export default App;
