## typeof 操作符

### 基本使用

```ts
let s = "hello";
let n = typeof s; // string
```

### 在泛型中使用

```ts
type Predicate = (x: unknown) => boolean;

type K = ReturnType<Predicate>; // k是boolean
```

下面的使用方法混淆了`value`与`type`
```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>; 
// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
```
如果想要推断函数`f`的类型, 我们可以使用`typeof`
```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
```