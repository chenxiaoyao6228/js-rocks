import { hasChange, isObject } from "../shared/utils";
import { trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";

// primitive类型无法使用 proxy 进行代理, 因此要使用使用对象进行包裹
// 这也是我们的RefImp类存在的原因
class RefImp {
  private _value;
  dep;
  rawValue: any;
  __v_isRef: boolean;
  constructor(value) {
    this.__v_isRef = true;
    this.rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }
  get value() {
    trackEffect(this.dep);
    return this._value;
  }
  set value(newValue) {
    if (!hasChange(this.rawValue, newValue)) return;
    this.rawValue = newValue;
    this._value = convert(newValue);
    triggerEffect(this.dep);
  }
}

function convert(value: any) {
  return isObject(value) ? reactive(value) : value;
}

export const ref = (value) => {
  const res = new RefImp(value);
  return res;
};

export function isRef(ref: RefImp): any {
  return !!ref.__v_isRef;
}
