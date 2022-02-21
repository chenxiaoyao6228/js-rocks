import { track, trigger } from "./effect";

export default function reactive(raw: Record<any, any>) {
  return new Proxy(raw, {
    get: function (target, key) {
      const res = Reflect.get(target, key);
      //  收集依赖
      track(target, key);
      return res;
    },
    set: function (target, key, val) {
      // 更新被追踪的元素的值
      const res = Reflect.set(target, key, val);
      // 触发依赖, 更新依赖的值
      trigger(target, key);
      return res;
    },
  });
}
