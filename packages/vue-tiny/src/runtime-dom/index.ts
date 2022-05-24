import { isNull, isObject, isUndefined } from '@js-rocks/lodash-tiny';
import { ElementType } from '../../typings';
import { createRenderer } from '../runtime-core';

function createElement (type: ElementType) {
  return document.createElement(type);
}

function patchProp (el: HTMLElement, key: string, oldVal: any, newVal: any) {
  const isOn = (key: string) => /^on[A-Z]/.test(key);
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase();
    el.addEventListener(event, newVal);
  } else {
    if (isNull(newVal) || isUndefined(newVal)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, newVal);
    }
  }
}

function insert (parent: HTMLElement, el: HTMLElement) {
  parent.append(el);
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
});

export function createApp (...args: any) {
  return renderer.createApp(...args);
}

export * from '../runtime-core';
