import { Equal, Expect } from "@type-challenges/utils";

// 数组
type cases_Zip = [
  Expect<Equal<_Zip<[], []>, []>>,
  Expect<Equal<_Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<_Zip<[1, 2, 3], ["1", "2"]>, [[1, "1"], [2, "2"]]>>,
  Expect<Equal<_Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<_Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
];

// 字符串
type cases_Capitalize = [
  Expect<Equal<_Capitalize<"hello world">, "Hello world">>
];

type cases_DropChar = [
  // @ts-expect-error
  Expect<Equal<DropChar<"butter fly!", "">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", "!">, "butter fly">>,
  Expect<Equal<DropChar<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];

type cases_CamelCase = [
  Expect<Equal<_CamelCase<"foobar">, "foobar">>,
  Expect<Equal<_CamelCase<"FOOBAR">, "foobar">>,
  Expect<Equal<_CamelCase<"foo_bar">, "fooBar">>,
  Expect<Equal<_CamelCase<"foo_bar_hello_world">, "fooBarHelloWorld">>,
  Expect<Equal<_CamelCase<"HELLO_WORLD_WITH_TYPES">, "helloWorldWithTypes">>,
  Expect<Equal<_CamelCase<"">, "">>
];

type Case1_AppendArgument = _AppendArgument<
  (a: number, b: string) => number,
  boolean
>;
type Result1_AppendArgument = (a: number, b: string, x: boolean) => number;

type Case2_AppendArgument = _AppendArgument<() => void, undefined>;
type Result2_AppendArgument = (x: undefined) => void;

// 函数
type cases_AppendArgument = [
  Expect<Equal<Case1_AppendArgument, Result1_AppendArgument>>,
  Expect<Equal<Case2_AppendArgument, Result2_AppendArgument>>
];

// 索引类型
interface Todo {
  title: string;
  length: number;
  completed: boolean;
}

type readonlyTobo = _ToReadonly<Todo>;
type mutableTobo = _ToMutable<readonlyTobo>;

type optionalTodo = _ToOptional<Todo>;
type requiredTodo = _ToRequired<optionalTodo>;

type UppercaseTodo = _UppercaseKey<Todo>;

type filterResult = FilterByValueType<Todo, string | number>;
