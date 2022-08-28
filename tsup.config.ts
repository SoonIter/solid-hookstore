// tsup.config.js
import { defineConfig } from "tsup";
export default defineConfig({
  entry: ["packages/hooks/use*/index.ts", "packages/basic/index.ts"],
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  tsconfig: "./tsconfig.json",
});
