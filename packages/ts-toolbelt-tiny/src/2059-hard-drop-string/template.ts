type Contains<S extends string, N extends string> = S extends `${any}${N}${any}` ? true : false;

type DropString<
  S extends string,
  R extends string,
  Res extends string = ''
> = S extends `${infer H}${infer T}`
  ? Contains<R, H> extends true
    ? DropString<T, R, `${Res}`>
    : DropString<T, R, `${Res}${H}`>
  : Res;
