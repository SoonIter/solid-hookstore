import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["index.ts"],
  clean: true,
  dts: true,
  // external:['@solid-hookstore/basic','@solid-hookstore/hooks'],
  splitting: true,
  format: ["esm", "cjs", "iife"],
  tsconfig: "./tsconfig.json",
});
