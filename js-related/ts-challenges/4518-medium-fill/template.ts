type _Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  Res extends unknown[] = [],
  curIndex extends unknown[] = [],
  isInSmallStart extends boolean = true
> = T extends [infer L, ...infer R]
  ? curIndex["length"] extends End
    ? [...Res, ...T]
    : curIndex["length"] extends Start
    ? _Fill<R, N, Start, End, [...Res, N], [...curIndex, 0], false>
    : isInSmallStart extends true
    ? _Fill<R, N, Start, End, [...Res, L], [...curIndex, 0], isInSmallStart>
    : _Fill<R, N, Start, End, [...Res, N], [...curIndex, 0], isInSmallStart>
  : [...Res, ...T];

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"]
> = _Fill<T, N, Start, End>;
