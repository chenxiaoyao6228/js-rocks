// 利用数组的长度进行计算, 保存进制1,2,4
type Zero = "0";
type One = "1";

type BinaryToDecimal<
  S extends string,
  Scale extends number[] = [0],
  Res extends unknown[] = []
> = S extends `${infer H}${Zero}`
  ? BinaryToDecimal<H, [...Scale, ...Scale], [...Res]>
  : S extends `${infer H}${One}`
  ? BinaryToDecimal<H, [...Scale, ...Scale], [...Scale, ...Res]>
  : Res["length"];
