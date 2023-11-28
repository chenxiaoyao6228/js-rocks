# @js-rocks/react-tiny

A tiny react-like library.

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

## Inspired by

Great thanks to [Preact](https://github.com/preactjs/preact),[Nerve](https://nervjs.github.io/docs/intro/overview.html), [Fre](https://github.com/frejs/fre),[Mini-react](https://github.com/lizuncong/mini-react)
