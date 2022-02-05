type DropChar<
  T,
  U,
  Res extends string = ""
> = T extends `${infer Head}${infer Tail}`
  ? Head extends U
    ? DropChar<Tail, U, Res>
    : DropChar<Tail, U, `${Res}${Head}`>
  : Res;
