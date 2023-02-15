## type assertions

TypeScript 允许你覆盖它的推断，毕竟作为开发者你比编译器更了解你写的代码。

类型断言主要用于当 TypeScript 推断出来类型并不满足你的需求，你需要手动指定一个类型。

## as 关键字与<>

对于 ts 初学者, 下面代码应该经常看到

```ts
interface User {
  name: string;
  id: string;
  phone: number;
}
let user = {};

user.name = "York"; // Property 'name' does not exist on type '{}'
```

上面的代码中, ts 将`user`推断为了`{}`类型, 为了告诉 ts 此处正确的类型, 可以使用`as`关键字进行类型断言

```ts
let user = {} as User;
```

另外一种断言的方式是`<>`

```ts
let user = <User>{};
```

## 非空断言!

如果编译器不能够去除 null 或 undefined，可以使用非空断言!手动去除。

https://link.juejin.cn/?target=https%3A%2F%2Fmedium.com%2Fbetter-programming%2Fcleaner-typescript-with-the-non-null-assertion-operator-300789388376%2F
## 注意
类型断言不要滥用
