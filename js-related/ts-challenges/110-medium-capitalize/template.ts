// 拿到首字母并大写化
// solution1:
// type MyCapitalize<S extends string> = S extends `${infer first}${infer rest}`
//   ? `${Uppercase<first>}${rest}`
//   : S;

type Mapping = {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
};

// solution: 2
// type MyCapitalize<S extends string> = S extends `${infer first}${infer rest}`
//   ? `${first extends keyof Mapping ? Mapping[first] : first}${rest}`
//   : S;

// solution: 3
type MyCapitalize<S extends string> = S extends `${infer first}${infer rest}`
  ? first extends keyof Mapping
    ? `${Mapping[first]}${rest}`
    : S
  : S;
