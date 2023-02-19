type Split<S extends string, SEP extends string> = S extends `${infer F}${SEP}${infer R}`
  ? [F, ...Split<R, SEP>]
  : SEP extends ''
  ? []
  : string extends S
  ? S[]
  : [S];
