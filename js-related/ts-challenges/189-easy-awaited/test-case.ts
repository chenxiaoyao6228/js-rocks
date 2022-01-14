type X = Promise<string>;
type Y = Promise<{ field: number }>;

type ResultX = MyAwaited<X>; // ResultX type equals string
type ResultY = MyAwaited<Y>; // ResultY type equals { field: number }
