import { Equal, Expect } from "@type-challenges/utils";

type case_IsUnion = [
  Expect<Equal<_IsUnion<"1" | "2" | "3" | "4" | "5">, true>>,
  Expect<Equal<_IsUnion<1 | 2>, true>>,
  Expect<Equal<_IsUnion<1>, false>>
];

type case_BEM = [
  Expect<Equal<_BEM<"btn", ["price"], []>, "btn__price">>,
  Expect<
    Equal<
      _BEM<"btn", ["price"], ["warning", "success"]>,
      "btn__price--warning" | "btn__price--success"
    >
  >,
  Expect<
    Equal<
      _BEM<"btn", [], ["small", "medium", "large"]>,
      "btn--small" | "btn--medium" | "btn--large"
    >
  >
];

type cases = [
  Expect<Equal<_AllCombinations<"">, "">>,
  Expect<Equal<_AllCombinations<"A">, "" | "A">>,
  Expect<Equal<_AllCombinations<"AB">, "" | "A" | "B" | "AB" | "BA">>,
  Expect<
    Equal<
      _AllCombinations<"ABC">,
      | ""
      | "A"
      | "B"
      | "C"
      | "AB"
      | "AC"
      | "BA"
      | "BC"
      | "CA"
      | "CB"
      | "ABC"
      | "ACB"
      | "BAC"
      | "BCA"
      | "CAB"
      | "CBA"
    >
  >,
  Expect<
    Equal<
      _AllCombinations<"ABCD">,
      | ""
      | "A"
      | "B"
      | "C"
      | "D"
      | "AB"
      | "AC"
      | "AD"
      | "BA"
      | "BC"
      | "BD"
      | "CA"
      | "CB"
      | "CD"
      | "DA"
      | "DB"
      | "DC"
      | "ABC"
      | "ABD"
      | "ACB"
      | "ACD"
      | "ADB"
      | "ADC"
      | "BAC"
      | "BAD"
      | "BCA"
      | "BCD"
      | "BDA"
      | "BDC"
      | "CAB"
      | "CAD"
      | "CBA"
      | "CBD"
      | "CDA"
      | "CDB"
      | "DAB"
      | "DAC"
      | "DBA"
      | "DBC"
      | "DCA"
      | "DCB"
      | "ABCD"
      | "ABDC"
      | "ACBD"
      | "ACDB"
      | "ADBC"
      | "ADCB"
      | "BACD"
      | "BADC"
      | "BCAD"
      | "BCDA"
      | "BDAC"
      | "BDCA"
      | "CABD"
      | "CADB"
      | "CBAD"
      | "CBDA"
      | "CDAB"
      | "CDBA"
      | "DABC"
      | "DACB"
      | "DBAC"
      | "DBCA"
      | "DCAB"
      | "DCBA"
    >
  >
];
