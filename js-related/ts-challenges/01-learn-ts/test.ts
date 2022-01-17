declare function f1(arg: { a: number; b: string }): void;

type T1 = Parameters<(s: string, n: number) => void>;
