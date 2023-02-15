import { Equal, Expect } from "@type-challenges/utils";

// [1, 2, 3, 4, 5]
type cases = [
  Expect<Equal<Flatten<"1">, ["1"]>>,
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>
];
