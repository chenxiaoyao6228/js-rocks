type Result = Concat<[1], [2]>; // expected to be [1, 2]
type Result2 = Concat<[1, 2, 3], [4, 5, 6]>;
type Result3 = Concat<[{ key: 1 }, { key: 2 }], [{ key: 3 }, { key: 4 }]>;
