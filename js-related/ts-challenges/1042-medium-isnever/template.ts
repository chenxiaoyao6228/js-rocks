// never相当于空集,空集是任何集合的子集，空集是任何非空集合的真子集，但空集不是空集的子集，因为任何两个相等的集合只能是对方的子集，而非真子集。
// type IsNever<T> = T extends never ? true : false; => 这种无法通过这个测试: Equal<IsNever<never>, true>

type IsNever<T> = [T] extends never[] ? true : false; // 这个为啥又可以呢?
