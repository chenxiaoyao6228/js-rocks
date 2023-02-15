// 全部为回环字符才为真, 否则为假
type IsPalindrome<S extends string | number> = S extends number
  ? IsPalindrome<`${S}`>
  : S extends `${infer H}${infer M}${infer T}`
  ? H extends T
    ? IsPalindrome<M>
    : false
  : true;
