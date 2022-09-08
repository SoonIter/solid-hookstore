# solid-hookstore

## QuickStart

```bash
npm install solid-hookstore
pnpm install solid-hookstore
```

```typescript
import {
  useLocalStorage,
  useTitle,
  createSharedValue,
  createHookStore,
  Signal,
} from "solid-hookstore";


const { defineHookStore } = createHookStore();
const useStore = defineHookStore("@title", () => {
  const initialValue = "title";
  const [a, setA] = useLocalStorage("@title", initialValue);
  const [b, setB] = useTitle(initialValue);
  const d = Signal(initialValue); // another way to use signal.

  // data binding -> merge hooks into one
  const [c, setC] = createSharedValue([a, setA], [b, setB], [d, d.set]);
  return d;
  // or use this:
  // return [c, setC];
});
```
```typescript
import {
  useLocalStorage,
  useTitle,
  createSharedValue,
  createHookStore,
  Signal,
} from "solid-hookstore";

// to only use the basic feature
import { useLocalStorage, useTitle } from "@solid-hookstore/hooks";
import {
  createSharedValue,
  createHookStore,
  Signal,
} from "@solid-hookstore/basic";
```
