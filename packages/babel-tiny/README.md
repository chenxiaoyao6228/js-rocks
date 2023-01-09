# `@js-rocks/babel-tiny`

a tiny babel implementation

## Install

```
yarn add @js-rocks/babel-tiny
```

## Usage
define custom plugin and then use

```js
const source = `
    const d = 2;
    const e = 4;
    function add(a, b) {
        const tmp = 1;
        return a + b;
    }
    add(c, d);
`;

function plugin1(api, options) {
  return {
    visitor: {
      Identifier(path) {
        if (path.findParent(p => p.isCallExpression())) {
          path.replaceWith(api.template.expression(options.replaceName));
        }
      },
    },
  };
}

const { code, map } = transformSync(source, {
  plugins: [
    [
      plugin1,
      {
        replaceName: 'minus',
      },
    ],
  ],
});

expect(code.indexOf('minus(c, d)') > -1).toEqual(true);
```
