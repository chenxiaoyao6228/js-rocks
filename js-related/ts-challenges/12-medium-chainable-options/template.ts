type Chainable<T extends {} = {}> = {
  option<K extends string, V>(
    key: K,
    value: V
  ): Chainable<T & { [key in K]: V }>;
  get(): T;
};
