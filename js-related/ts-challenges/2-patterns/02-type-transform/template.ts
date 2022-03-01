// 适用范围: 数组,字符串, 函数, 索引类型

// 数组

// eg:
// type tuple
// type tuple2 = ["hello", "world"];

// type Zip<
//   One extends [unknown, unknown],
//   Other extends [unknown, unknown]
// > = One extends [infer OneFirst, infer OneSecond]
//   ? Other extends [infer OtherFirst, infer OtherSecond]
//     ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]]
//     : []
//   : [];

type _Zip<
  T extends unknown[],
  U extends unknown[],
  Res extends unknown[] = []
> = T extends [infer THead, ...infer TTail]
  ? U extends [infer UHead, ...infer UTail]
    ? Zip<TTail, UTail, [...Res, [THead, UHead]]>
    : Res
  : Res;

// 字符串
type _Capitalize<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : Str;

type _CamelCase<S extends string> =
  S extends `${infer first}_${infer second}${infer third}`
    ? `${Lowercase<first>}${Capitalize<second>}${_CamelCase<third>}`
    : `${Lowercase<S>}`;

type _DropChar<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? _DropChar<`${Prefix}${Suffix}`, SubStr>
  : Str;

// 函数
type _AppendArgument<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never;

// 索引类型

// Mapping: 对值做操作

// eg:
// type Mapping<Obj extends object> = {
//   [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]];
// };

// reMapping: 对key进行操作

type _Record<K extends string | number | symbol, T> = { [P in K]: T };

// required与optional
type _ToRequired<T> = { [Key in keyof T]-?: T[Key] };
type _ToOptional<T> = { [Key in keyof T]?: T[Key] };

// readonly与mutable
type _ToReadonly<T> = { readonly [Key in keyof T]: T[Key] };
type _ToMutable<T> = { -readonly [Key in keyof T]: T[Key] };

type _UppercaseKey<Obj extends object> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};

type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as ValueType extends Obj[Key] ? Key : never]: Obj[Key];
};
