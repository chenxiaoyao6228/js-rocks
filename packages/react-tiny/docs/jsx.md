# Understand JSX

This article will answer the following questions:

- what is jsx and how it works , fragment and svg in react ?
- ts jsx support ?
- jsx testing ?
- jsx-dev-runtime and how to use it ?
- jsx to fiber ?
- jsx comparision with Vue

## What is jsx

JSX is an syntax extension to JavaScript. JSX gets compiled to React.createElement()m, you can go to the [official site](https://reactjs.org/docs/introducing-jsx.html) and [babel playground](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=true&loose=false&code_lz=DwPmHoSA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2%2Cstage-3&prettier=false&targets=&version=7.21.2&externalPlugins=&assumptions=%7B%7D) to check how it compiled

```jsx
<div>jsx</div>
// will be compiled to
/_#**PURE**_/React.createElement("div", null, "jsx");
```

Full syntax table

```

```

## Typescript tsx support

in your tsconfig.json, for more, [see the docs here](https://www.typescriptlang.org/tsconfig#jsx)

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  }
}
```

## Test tsx

change your file extension to `.tsx`

Unit test:

```tsx
import { h } from '../src/index';

test('h', () => {
  // the <div/> will be parsed to h(...)
  expect(<div />).toEqual({
    type: 'div',
    props: {},
    children: [],
  });
});
```

## jsx-dev-runtime

since Reactv17.0, we don't need to write `import React from 'react` anymore, [see](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html), and [here](https://www.npmjs.com/package/vite-plugin-babel)
