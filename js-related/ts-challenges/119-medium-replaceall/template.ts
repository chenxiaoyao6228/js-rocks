// your answers
type MyReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer X}${From}${infer Y}`
  ? `${X}${To}${MyReplaceAll<Y, From, To>}`
  : S;
