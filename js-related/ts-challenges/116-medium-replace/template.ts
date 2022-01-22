type MyReplace<
  S extends string,
  From extends string,
  To extends string
> = S extends ""
  ? S
  : S extends `${infer X}${From}${infer Y}`
  ? `${X}${To}${Y}`
  : S;
