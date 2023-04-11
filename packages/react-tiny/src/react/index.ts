import { Action } from '../shared/ReactTypes';
import currentDispatcher, { Dispatcher, resolveDispacher } from './src/currentDispatcher';
// TODO: adapt to jsx automatic
export { jsx, jsxDev } from './src/jsx';

export const useState: Dispatcher['useState'] = (initialState: any) => {
  const dispatcher = resolveDispacher();
  return dispatcher.useState(initialState);
};

export const _SECRET_INTERNALS = {
  currentDispatcher,
};
