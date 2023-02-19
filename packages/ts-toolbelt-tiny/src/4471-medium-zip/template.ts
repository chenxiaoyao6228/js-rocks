//  递归终止条件: T 或者 U为空的时候
type Zip<T extends unknown[], U extends unknown[], Res extends unknown[] = []> = T extends [
  infer THead,
  ...infer TTail
]
  ? U extends [infer UHead, ...infer UTail]
    ? Zip<TTail, UTail, [...Res, [THead, UHead]]>
    : Res
  : Res;

// solution2: 利用长度来进行比较
// type Zip<
//   A extends any[],
//   B extends any[],
//   L extends any[] = []
// > = L["length"] extends A["length"] | B["length"]
//   ? L
//   : Zip<A, B, [...L, [A[L["length"]], B[L["length"]]]]>;

type tuple1 = [1, 2];
type tuple2 = ['hello', 'world'];
