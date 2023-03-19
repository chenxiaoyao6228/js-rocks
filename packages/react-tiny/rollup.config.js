import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

function getBasePlugins() {
  return [
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
