import { Equal, Expect } from "@type-challenges/utils";

// 这里的' Hello World '是类型
type trimed = TrimLeft<"  Hello World  ">; // expected to be 'Hello World  '

// 值还是类型
// const t = "hello world"; // 值
// const t_ = typeof t; // 值->类型 "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
// type T_ = typeof t; // 'hello world' 是一种类型, 和'string', 'number' 等同等地位
// type T = "hello world"; // 类型

// type cases = [Expect<Equal<T, typeof t>>];
