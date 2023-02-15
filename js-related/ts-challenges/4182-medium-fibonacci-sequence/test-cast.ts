import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<4>, 3>>,
  Expect<Equal<Fibonacci<5>, 5>>,
  Expect<Equal<Fibonacci<8>, 21>>
];
