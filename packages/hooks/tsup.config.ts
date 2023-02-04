export default {
  entry: ['./src/index.ts'],
  clean: true,
  dts: true,
  splitting: true,
  format: ['esm', 'cjs'],
  external: ['@solidjs/router', 'solid-js'],
  tsconfig: './tsconfig.json'
};
