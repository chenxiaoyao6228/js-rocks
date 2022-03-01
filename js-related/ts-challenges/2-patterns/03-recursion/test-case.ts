import { Equal, Expect } from "@type-challenges/utils";

// Promise
type case_DeepPromise = _DeepPromiseValueType<
  Promise<Promise<Promise<Record<string, any>>>>
>;

// 数组
type case_Includes = _Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`

type case_Remove = _Remove<[1, 2, 2, 3], 2>;

type case_ReverseArr = _ReverseArr<[1, 2, 3]>;

// 字符串
type case_ReverseStr = _ReverseStr<"abcd">;

type case_StringToUnion = _StringToUnion<"abcd">;

type cases_DeepReadonly = [Expect<Equal<DeepReadonly<X>, Expected>>];

type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
    };
  };
};

type Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
    };
  };
};
