import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["index.ts"],
  clean: true,
  dts: true,
  splitting: true,
  // minify: true,
  format: ["esm", "cjs", "iife"],
  external: ["@solidjs/router", "solid-js"],
  tsconfig: "./tsconfig.json",
});
