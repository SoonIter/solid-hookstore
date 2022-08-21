import { expect, it } from "vitest";
import useCounter from "../packages/hooks/useCounter";

it("useCounter", () => {
  const [x, add] = useCounter(0);
  expect(x()).toBe(0);
  add()
  expect(x()).toBe(1);
});
