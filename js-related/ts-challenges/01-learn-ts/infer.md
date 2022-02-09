## infer


官网的例子

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

为什么要加, 下面这种操作不可以吗?

```ts
type ReturnType<T> = T extends (...args: any[]) => R ? R : any;
```

关键点:

- infer 用于泛型函数中的条件类型的 extends 语句中
- infer 确保你显式地声明了所有的参数 

来看一个简单的例子

```ts
type MyType<T> = T extends infer R ? R : never;
type T1 = MyType<{ b: string }>; // T1 is { b: string; }
```

在没有infer的情况下, ts编译器无法知道你是否要在后面引入一个条件语句

```ts
type MyType2<T> = T extends R2 ? R2 : never; // error, R2 undeclared
```

具体来说, 在没有声明的情况下, ts编译器会去找R的声明
```ts
type R = { a: number }
type MyType3<T> = T extends R ? R : never; // compare T with type R
type T2 = MyType2<{b: string}> // T2 is never
```


更多例子

```ts
type UnpackArrayType<T> = T extends (infer R)[] ? R: T;
type t1 = UnpackArrayType<number[]>; // t1 is number
```

```ts
type UnpackArrayType<T> = T extends (infer R)[] ? R : T;
type t2 = UnpackArrayType<string>; // t2 is string
```
```ts
interface Greet {
  name: string;
}
type UnpackArrayType<T> = T extends (infer R)[] ? R : T;
type t3 = UnpackArrayType<Greet>; // Greet

```

UnpackArrayType根据输入参数返回新的类型, 如果传入的类型参数是一个数组类型, 如`string[]`,`number[]`等, 就返回数组内部的元素`string`, `number`等, 否则返回传入的类型自身, 因为`R`是从传入的`T`推断出来的,所以用了`infer`


update: `infer`与局部变量声明:

```ts
type A = 'hello'; // 声明全局变量
type B = [A] extends infer T ? (
    T // => 在这个表达式的作用域内，T 都为 [A]
) : never  // 声明局部变量
```

## 练习

可参考这里: 
https://www.freecodecamp.org/news/typescript-curry-ramda-types-f747e99744ab/

## 参考

https://stackoverflow.com/questions/60067100/why-is-the-infer-keyword-needed-in-typescript
