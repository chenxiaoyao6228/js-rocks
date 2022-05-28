import { isNull, isObject, isUndefined } from '@js-rocks/lodash-tiny';
import { ElementType } from '../../typings';
import { createRenderer } from '../runtime-core';

function createElement (type: ElementType) {
  return document.createElement(type);
}
function createText (content: string) {
  return document.createTextNode(content);
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

function insert (parent: HTMLElement, child: HTMLElement, anchor: any) {
  parent.insertBefore(child, anchor || null);
}
function remove (parent: HTMLElement, el: HTMLElement) {
  parent.removeChild(el);
}

function setElementText (parent: HTMLElement, text: string) {
  parent.textContent = text;
}

const renderer: any = createRenderer({
  createElement,
  createText,
  patchProp,
  insert,
  remove,
  setElementText,
});

export function createApp (...args: any) {
  return renderer.createApp(...args);
}

export * from '../runtime-core';
