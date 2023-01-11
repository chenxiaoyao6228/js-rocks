const { transformSync } = require('@js-rocks/babel-tiny');
const jsxPlugin = require('../lib/babel-plugin-vue-jsx-tiny.cjs.js');

const { code, map } = transformSync('const a = 1', {
  parserOpts: {},
  plugins: [
    [
      jsxPlugin,
      {
        replaceName: 'minus',
      },
    ],
  ],
});

console.log('code', code);
