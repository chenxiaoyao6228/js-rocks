/*
联合分散可简化
适用对象: 联合类型
场景描述: 某些情况下, typescript对联合类型的计算做了简化,  TypeScript 会把每一个元素单独传入来做类型运算,最后再合并成联合类型 ,这种语法叫做分布式条件类型。
 - 当类型参数为联合类型,并且在条件类型左边直接引用该类型参数
 - 联合类型在字符串中
*/

type aa = 1 | 2 extends number ? true : false;
type bb = "1" | 2 extends number ? true : false;

type UppercaseA<Item extends string> = Item extends "a"
  ? Uppercase<Item>
  : Item;

type Union = "a" | "b" | "c";

type case_UppercaseA = UppercaseA<Union>; // ❗❗注意这里传入的是联合类型

// 字符串中的同样会触发这种操作
type case_UnionInStr = `~${Union}~`;

// StringToUion
type _Camelcase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${_Camelcase<Rest>}`
    : Str;

type _CamelcaseArr<
  Arr extends unknown[],
  Result extends unknown[] = []
> = Arr extends [infer Item, ...infer RestArr]
  ? [...Result, _Camelcase<Item & string>, ..._CamelcaseArr<RestArr>]
  : Result;

type _CamelcaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${_CamelcaseUnion<Rest>}`
    : Item;

// isUnion
type _IsUnion<A, B = A> = A extends A
  ? [B] extends [A]
    ? false
    : true
  : never;

// BEM
// type _BEM<
//   Block extends string,
//   Element extends string[],
//   Modifiers extends string[]
// > = `${Block}__${Element[number]}--${Modifiers[number]}`;

type _BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = E["length"] extends 0
  ? `${B}--${M[number]}`
  : M["length"] extends 0
  ? `${B}__${E[number]}`
  : `${B}__${E[number]}--${M[number]}`;

// AllCombinations
type _AllCombinations<
  S extends string,
  OriginalS extends string = S
> = S extends `${infer Head}${infer Tail}`
  ?
      | `${Head}${_AllCombinations<Tail>}`
      // rotation
      | (`${Tail}${Head}` extends OriginalS
          ? OriginalS
          : _AllCombinations<`${Tail}${Head}`, OriginalS>)
      | _AllCombinations<Tail>
  : S;
