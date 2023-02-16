import { Equal, Expect } from "@type-challenges/utils";

type StringToNumber = { mapFrom: string; mapTo: number };
type Result = MapTypes<{ iWillBeANumberOneDay: string }, StringToNumber>;
type Expected = { iWillBeANumberOneDay: number };

type StringToDate = { mapFrom: string; mapTo: Date };
type Result2 = MapTypes<
  { iWillBeNumberOrDate: string },
  StringToDate | StringToNumber
>;
type Expected2 = { iWillBeNumberOrDate: number | Date };

type Result3 = MapTypes<
  { iWillBeANumberOneDay: string; iWillStayTheSame: Function },
  StringToNumber
>;

type Expected3 = { iWillBeANumberOneDay: number; iWillStayTheSame: Function };

type cases = [
  Expect<Equal<Result, Expected>>,
  Expect<Equal<Result2, Expected2>>,
  Expect<Equal<Result3, Expected3>>
];
