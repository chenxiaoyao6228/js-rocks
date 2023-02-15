type ObjectFromEntries<T extends [string, any]> = {
  [K in T as K[0]]: K[1];
};
