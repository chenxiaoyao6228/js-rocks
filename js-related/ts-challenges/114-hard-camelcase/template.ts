type CamelCase<S extends string> =
  S extends `${infer first}_${infer second}${infer third}`
    ? `${Lowercase<first>}${Capitalize<second>}${CamelCase<third>}`
    : `${Lowercase<S>}`;
