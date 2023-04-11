import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

function getBasePlugins() {
  return [
    replace({
      __DEV__: true,
      preventAssignment: true,
    }),
    typescript({
      tsconfig: 'tsconfig.json',
      removeComments: true,
    }),
    resolve(),
    commonjs(),
  ];
}

export default [
  {
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        file: pkg.main,
      },
      {
        format: 'es',
        file: pkg.module,
      },
    ],

    plugins: getBasePlugins(),
  },
];
