/// <reference types="vitest" />
import { resolve } from "path"; // eslint-disable-line
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "happy-dom",
    cache: {
      dir: resolve(__dirname, "./node_modules/.vitest"),
    },
    exclude: ["**/node_modules/**", "**/samples/**"],
  },
});
