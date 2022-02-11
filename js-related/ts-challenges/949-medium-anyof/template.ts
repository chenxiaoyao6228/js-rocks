// 注意这里的Record<any, never>不能写成{},原因是{}是任意类型的父类型
// Record是生成索引类型的, 因此Record<any, any>约束了这里只能传入索引类型
// 具体见stackoverflow.com/questions/60996831/differences-between-recordstring-any-and
type FalsyValues = [0, "", false, [], Record<any, never>];
type AnyOf<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Head extends FalsyValues[number]
    ? AnyOf<Tail>
    : true
  : false;

type MMMJ = AnyOf<[0, "", false, [], {}]>;
