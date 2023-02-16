// enumToUnion
enum EnumA {
  a = "a",
  b = "b",
}

type case_EnumA_To_Union = `${EnumA}`;

// arrayToUion
type case_Array_To_Union = ["a", "b", "c"][number];

// ObjectKeysToUnion
//www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types
https: type AA = {
  a: string;
  b: string;
  c: number;
};

type M = keyof AA;
// type dd = "a" extends M ? true : false;
