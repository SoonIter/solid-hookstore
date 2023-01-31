import { defineConfig } from "tsup";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  entry: ["index.ts", "./src/index.ts"],
  clean: true,
  dts: true,
  splitting: true,
  format: ["esm", "cjs"],
  external: ["@solidjs/router", "solid-js"],
  tsconfig: "./tsconfig.json",
});
