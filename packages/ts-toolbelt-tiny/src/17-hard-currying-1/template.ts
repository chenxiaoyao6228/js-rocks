type Curry<P, R> = P extends [infer H, ...infer T] ? (p: H) => Curry<T, R> : R;

declare function Currying<F>(fn: F): F extends (...P: infer A) => infer R ? Curry<A, R> : never;

// more on : https://www.freecodecamp.org/news/typescript-curry-ramda-types-f747e99744ab/
