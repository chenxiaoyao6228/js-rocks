// type space = " " | "\t" | "|n";

// 方法一:

// type TrimRight<S extends string> = S extends `${infer L}${space}`
//   ? TrimRight<L>
//   : S;

// type Trim<S extends string> = S extends
//   | `${space}${infer right}`
//   | `${infer left}${space}`
//   ? TrimRight<TrimLeft<right>>
//   : S;

// 方法二:

type Trim<S extends string> = S extends
  | `${space}${infer rest}`
  | `${infer rest}${space}`
  ? Trim<rest>
  : S;
