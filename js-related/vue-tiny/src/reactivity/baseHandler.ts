import { track, trigger } from "./effect";

function createGetter(isReadOnly = false) {
  return function (target, key) {
    const res = Reflect.get(target, key);
    //  收集依赖
    if (!isReadOnly) {
      track(target, key);
    }
    return res;
  };
}

// 保持代码的一致性, 也抽离setter
function createSetter() {
  return function (target, key, val) {
    // 更新被追踪的元素的值
    const res = Reflect.set(target, key, val);
    // 触发依赖, 更新依赖的值
    trigger(target, key);
    return res;
  };
}

export const mutableHandlers = {
  get: createGetter(),
  set: createSetter(),
};

export const readonlyHandlers = {
  get: createGetter(),
  set: (target, key, val) => {
    return true;
  },
};
