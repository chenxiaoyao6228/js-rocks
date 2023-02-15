// 当前一个字母是首字母, 以及',' | '.' | ''的时候大写

type CapitalizeWord<S extends string> = S extends `${infer first}${infer rest}`
  ? first extends " " | "." | ","
    ? `${first}${CapitalizeWord<Capitalize<rest>>}`
    : `${first}${CapitalizeWord<rest>}`
  : S;
type CapitalizeWords<S extends string> = CapitalizeWord<Capitalize<S>>;
