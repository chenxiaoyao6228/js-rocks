// 凡是涉及数值计算的, 要反应过来利用数组
type ToNumber<S extends string, L extends number[] = []> = `${L['length']}` extends S
  ? L['length']
  : ToNumber<S, [...L, 0]>;
