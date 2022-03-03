import { track, trigger } from "./effect";
import { reactive, readonly, ReactiveFlags } from "./reactive";
import { isObject } from "../shared/utils";

// 实现缓存
const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

// get的时候触发依赖收集, set的时候触发依赖
// 注意是和effect搭配的时候才会有依赖收集的操作
function createGetter(isReadOnly = false, shallow = false) {
  return function (target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadOnly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadOnly;
    }

    const res = Reflect.get(target, key);

    if (shallow) {
      return res;
    }

    if (isObject(res)) {
      return isReadOnly ? readonly(res) : reactive(res);
    }

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

export const mutableHandlers = { get, set };

export const readonlyHandlers = {
  get: readonlyGet,
  set: (target, key, val) => {
    console.warn(`key ${key} can not be set, as ${target} is readonly`);
    return true;
  },
};

export const shallowReadonlyHandlers = Object.assign({}, readonlyHandlers, {
  get: shallowReadonlyGet,
});
