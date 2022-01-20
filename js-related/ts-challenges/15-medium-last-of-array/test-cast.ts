// https: github.com/type-challenges/type-challenges/blob/master/questions/15-medium-last/README.md

import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];
