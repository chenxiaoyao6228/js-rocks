// solution1
// type KebabCase<
//   T extends string,
//   Res extends string = ""
// > = T extends `${infer Head}${infer Tail}`
//   ? Head extends Lowercase<Head>
//     ? KebabCase<Tail, `${Res}${Head}`>
//     : Res extends ""
//     ? KebabCase<Tail, `${Lowercase<Head>}`>
//     : KebabCase<Tail, `${Res}-${Lowercase<Head>}`>
//   : Res;

// solution2
type KebabCase<S extends string, P extends string = ''> = S extends `${infer L}${infer R}`
  ? L extends Lowercase<L>
    ? `${L}${KebabCase<R, '-'>}`
    : `${P}${Lowercase<L>}${KebabCase<R, '-'>}`
  : S;
