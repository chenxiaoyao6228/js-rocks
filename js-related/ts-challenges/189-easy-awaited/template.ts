/* 
获取promise中的返回类型
*/
//为了解决嵌套 Promise 的问题，让类型递归了
type MyAwaited<T extends any> = T extends Promise<infer U> ? MyAwaited<U> : T;
