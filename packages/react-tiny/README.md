# @js-rocks/react-tiny

A tiny react-like library.

## Features

- [React Api](https://reactjs.org/docs/react-api.html)
- [Preact Docs: Differences to React](https://www.preactjs.com.cn/guide/v10/differences-to-react/)
- [从 React 切换到 Nerv](https://nervjs.github.io/docs/guides/switching-to-nerv.html)

## Usage

```js
import { render, useState } from '@js-rocks/react-tiny';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}

render(<App />, document.body);
```

## TODO && Done

- [ ] (understand JSX)
- [ ] (change current architecture to fiber, fiber and reconciler)
- [ ] (scheduler, lane model, time slicing)
- [ ] (hooks support)
- [ ] (context)
- [ ] (batch update comparison with React and Vue3)
- [ ] (diff algorithm comparison with React and Vue3)
- [ ] (concurrent mode: suspense)
- [ ] (Ref)
- [ ] (Development mode support, Devtools support?)
- [ ] (Error boundary)
- [ ] (Custom renderer support?)
- [ ] (Hydrate)

## Inspired by

Great thanks to [Preact](https://github.com/preactjs/preact),[Nerve](https://nervjs.github.io/docs/intro/overview.html), [Fre](https://github.com/frejs/fre),[Mini-react](https://github.com/lizuncong/mini-react)
