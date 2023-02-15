// 解释: https://github.com/chenxiaoyao6228/type-challenges-solutions/blob/main/zh/medium-append-argument.md
type AppendArgument<Fn, A> = Fn extends (...args: [...infer P]) => infer R
  ? (args: [...P, A]) => R
  : never;
