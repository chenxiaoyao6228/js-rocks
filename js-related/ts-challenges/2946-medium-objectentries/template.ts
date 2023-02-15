type ObjectEntries<T, K = keyof T> = K extends keyof T
  ? [K, Required<T>[K]]
  : never;
