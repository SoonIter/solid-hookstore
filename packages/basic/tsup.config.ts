import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  clean: true,
  dts: false,
  splitting: true,
  format: ['esm', 'cjs'],
  external: ['@solidjs/router', 'solid-js'],
  tsconfig: './tsconfig.json'
});
