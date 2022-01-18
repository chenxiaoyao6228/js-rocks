// typeof: js世界里面的东西转化到ts世界
// as const: 数组 -> 元组
// 遍历数组: [P in T[number]]

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type result = TupleToObject<typeof tuple>;

// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
