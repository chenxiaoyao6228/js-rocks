// let b = a + 1
// 期待b跟着a变化的而变化, 那么势必要拦截a的更新操作
let activeEffect: ReactiveEffect | null = null;
let shouldTrack = false;
const targetMap = (window._targetMap = new Map());

export class ReactiveEffect {
  private _fn: Function;
  private active = true;
  deps: Set<ReactiveEffect>[] = [];
  scheduler?: Function;
  onStop?: Function;
  // fn: vue patch function
  constructor(fn: Function, scheduler?: Function) {
    this._fn = fn;
    this.scheduler = scheduler;
  }
  run() {
    if (!this.active) {
      return this._fn();
    }

    // 避免普通的访问也进行依赖收集
    shouldTrack = true;
    activeEffect = this;

    const res = this._fn();

    // 重置
    shouldTrack = false;
    return res;
  }
  stop() {
    if (this.active) {
      cleanUpEffect(this);
      this.onStop && this.onStop();
      this.active = false;
    }
  }
}

function cleanUpEffect(effect: ReactiveEffect) {
  effect.deps.forEach(dep => {
    dep.delete(effect);
  });
}

export const isTracking = () => {
  return shouldTrack && activeEffect !== undefined;
};

/*
 *  track value when getter is trigger
 *  eg: in render function we need to get the value before render it to the dom
 */
export function track(target: Record<any, any>, key: symbol | string) {
  // target -> key -> deps (array of runners)
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  trackEffect(dep);
}

export function trackEffect(dep) {
  // 看看dep之前有没有被添加过, 避免重复被添加
  if (dep.has(activeEffect)) return;
  dep.add(activeEffect);
  activeEffect?.deps.push(dep);
}

export function trigger(target: Record<any, any>, key: symbol | string) {
  // when is targetMap set?
  const depsMap = targetMap.get(target);
  const deps = depsMap.get(key);
  triggerEffect(deps);
  activeEffect = null;
}

export const triggerEffect = deps => {
  for (const dep of deps) {
    if (dep?.scheduler) {
      dep.scheduler();
    } else {
      dep?.run();
    }
  }
};

type EffectOption = {
  scheduler?: Function;
  onStop?: Function;
};

export default function effect(fn: Function, options: EffectOption = {}) {
  const { scheduler, onStop } = options;
  const _effect = new ReactiveEffect(fn, scheduler);
  _effect.onStop = onStop;
  _effect.run(); // 先自己执行一遍
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner: any) {
  // find runner from our dep and remove it
  // the problem is how to find effect since it is one of the depedency of deps
  // this solution is to attach _effect to runner when run effect()
  return runner.effect.stop();
}
