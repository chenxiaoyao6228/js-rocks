// first attempt
// type Length<T> = T extends any[] ? T["length"] : never;

// eg: 1
type Length<T extends readonly any[]> = T["length"];

// eg2:

// type Length2<T extends any[]> = T extends { length: infer L } ? L : never;
