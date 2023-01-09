import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/index.js',
  output: [
    // 1. cjs -> commonjs
    // 2. esm
    {
      format: 'cjs',
      file: pkg.main,
    },
    {
      format: 'es',
      file: pkg.module,
    },
  ],

  plugins: [resolve(), commonjs()],
};
