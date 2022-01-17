declare function f1(arg: { a: number; b: string }): void;

type ParametersResult = Parameters<(s: string, n: number) => void>;
