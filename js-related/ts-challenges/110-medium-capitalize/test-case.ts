import { Equal, Expect } from "@type-challenges/utils";

type cases = [Expect<Equal<MyCapitalize<"hello world">, "Hello world">>];
