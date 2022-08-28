import { describe, expect, it } from "vitest";
import { add } from "../packages/shared";

describe("add", () => {
  it("adds two numbers", () => {
    expect(add(1, 2)).toEqual(3);
  });
});
