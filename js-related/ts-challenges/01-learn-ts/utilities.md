## typescript内置的工具函数


### ParametersConstructor
为构造器创建接口
```ts
interface ErrorConstructor {
    new(message?: string): Error;
    (message?: string): Error;
    readonly prototype: Error;
}
```

### Parameters
```ts
declare function f1(arg: { a: number; b: string }): void;
type T2 = Parameters<typeof f1>;
type T3 = Parameters<<T>(a: T) => T>;

```


### instanceType<Type>
class C {
  x = 0;
  y = 0;
}

type T5 = InstanceType<typeof C>;

### ThisParameterType<Type>
```ts
function toHex(this: Number) {
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```
### OmitThisParameter
```ts
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
```

### thisType<Type>
```ts
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;
};
```
### thisType<Type>
```ts
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0 },
  methods: {
    moveBy(dx: number) {},
  },
});
```