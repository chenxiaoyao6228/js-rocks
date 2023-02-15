declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{ [k in keyof T]: T[k] extends Promise<infer R> ? R : T[k] }>;
