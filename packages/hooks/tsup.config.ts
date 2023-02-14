export default {
  entry: ['./src/index.ts'],
  clean: true,
  dts: false,
  splitting: true,
  format: ['esm', 'cjs'],
  external: ['@solidjs/router', 'solid-js'],
  tsconfig: './tsconfig.json'
};
