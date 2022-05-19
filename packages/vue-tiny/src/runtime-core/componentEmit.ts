import { capitalize } from '@js-rocks/lodash-tiny';
import { ComponentInstance } from '../../typings/index';

export function emit (instance: ComponentInstance, eventName: string, ...args: any) {
  const { props } = instance;

  const toHandleKey = (eventName: string) => {
    return eventName ? `on${capitalize(eventName)}` : '';
  };

  const handlerName = toHandleKey(eventName);

  const handler = props[handlerName];

  handler && handler(...args);
}
