// solution1
// type StringToArr<T> = T extends `${infer L}${infer R}`
//   ? [L, ...StringToArr<R>]
//   : [T]; // StringToArr<"abc">  => ["a", "b", "c", ""]

// type StringToUnion<T> = StringToArr<T>[number]; // StringToArr<"abc"> => "" | "a" | "b" | "c"

// type findTwoStringCombinations<L extends string, R extends string> =
//   | L
//   | R
//   | `${L}${R}`
//   | `${R}${L}`;

// type _AllCombinations<S extends string, T extends string = S> = S extends S
//   ? findTwoStringCombinations<_AllCombinations<Exclude<T, S>>, S>
//   : never;

// type AllCombinations<S extends string> = _AllCombinations<StringToUnion<S>>;

// solution 2
type AllCombinations<
  S extends string,
  OriginalS extends string = S
> = S extends `${infer Head}${infer Tail}`
  ?
      | `${Head}${AllCombinations<Tail>}`
      // rotation
      | (`${Tail}${Head}` extends OriginalS
          ? OriginalS
          : AllCombinations<`${Tail}${Head}`, OriginalS>)
      | AllCombinations<Tail>
  : S;
