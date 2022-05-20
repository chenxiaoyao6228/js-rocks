import { ElementType } from '../../typings';
import { createRenderer } from '../runtime-core';

function createElement (type: ElementType) {
  console.log('type', type);
  return document.createElement(type);
}

function patchProp (el: HTMLElement, key: string, val: any) {
  const isOn = (key: string) => /^on[A-Z]/.test(key);
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase();
    el.addEventListener(event, val);
  } else {
    el.setAttribute(key, val);
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
