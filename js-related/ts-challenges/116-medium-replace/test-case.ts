import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<
    Equal<MyReplace<"types are fun!", "fun", "awesome">, "types are awesome!">
  >,
  Expect<Equal<MyReplace<"", "fun", "awesome">, "">>
];
