import { Action } from '../../shared/ReactTypes';

export type Dispatch<State> = (action: Action<State>) => void;

export interface Dispatcher {
  useState: <T>(initialState: () => T | T) => [T, Dispatch<T>];
}

const currentDispatcher: { current: Dispatcher | null } = {
  current: null,
};

export const resolveDispacher = (): Dispatcher => {
  const dispatcher = currentDispatcher.current;

  if (dispatcher === null) {
    throw new Error('hooks should only be called in function component');
  }
  return dispatcher;
};

export default currentDispatcher;
