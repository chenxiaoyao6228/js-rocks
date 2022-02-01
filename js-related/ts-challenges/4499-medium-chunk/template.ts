// 按照分片的形式切割原数组, Cur == N, 推到Res, C重置, 否则推到Cur
// 如果 N大于 A的长度, 直接返回 A,

type Chunk<
  T extends any[],
  N extends number,
  Cur extends any[] = [],
  Res extends any[] = []
> = T extends [infer Head, ...infer R]
  ? Cur["length"] extends N
    ? Chunk<R, N, [Head], [...Res, Cur]>
    : Chunk<R, N, [...Cur, Head], Res>
  : Cur extends []
  ? Res
  : [...Res, Cur];

type A = Chunk<[1, 2, 3], 1>;
