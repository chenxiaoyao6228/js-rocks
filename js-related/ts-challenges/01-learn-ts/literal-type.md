# literal type

类比javascript的`let` 和 `const`
```ts
let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;
      
let changingString: string
 
const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;
```


```ts
const t = "hello world"; // 值
const t_ = typeof t; // 值->类型 "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
type T_ = typeof t; // 'hello world' 是一种类型, 和'string', 'number' 等同等地位
type T = "hello world"; // 类型

type cases = [Expect<Equal<T, typeof t>>];
```