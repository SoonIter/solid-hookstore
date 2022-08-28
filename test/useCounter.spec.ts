import { expect, it } from "vitest";
import useCounter from "../packages/hooks/useCounter";

it("useCounter", () => {
  const [x, { inc }] = useCounter(0);
  expect(x()).toBe(0);
  inc();
  expect(x()).toBe(1);
});
