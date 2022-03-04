import { hasChange } from "../shared/utils";
import { trackEffect, triggerEffect } from "./effect";

// primitive类型无法使用 proxy 进行代理, 因此要使用使用对象进行包裹
// 这也是我们的RefImp类存在的原因
class RefImp {
  private _value;
  public dep;
  constructor(value) {
    this._value = value;
    this.dep = new Set();
  }
  get value() {
    trackEffect(this.dep);
    return this._value;
  }
  set value(newValue) {
    if (!hasChange(this._value, newValue)) return;
    this._value = newValue;
    triggerEffect(this.dep);
  }
}

export const ref = (value) => {
  const res = new RefImp(value);
  return res;
};
