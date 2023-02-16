import { Equal, Expect } from "@type-challenges/utils";

type Test = { id: "1" };
type Result = AppendToObject<Test, "value", 4>;
type Expected = { id: "1"; value: 4 };

type cases = [Expect<Equal<Result, Expected>>];
