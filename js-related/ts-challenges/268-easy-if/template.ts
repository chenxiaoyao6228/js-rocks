// js
// function if(predicate, trueBranch, falseBranch) {
//     return predicate ? trueBranch: falseBranch;
// }

// 失败尝试: type If<T extends any[]> = T[0] extends true ? T[1] : T[2];

type If<C extends Boolean, T, F> = C extends true ? T : F;

// js中的参数用,隔开,则ts中的也应该用,隔开
