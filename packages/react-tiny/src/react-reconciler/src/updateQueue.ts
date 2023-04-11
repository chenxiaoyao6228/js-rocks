import { Action } from '../../shared/ReactTypes';

export interface Update<State> {
  action: Action<State>;
}

export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null;
  };
  dispatch: Action<State> | null;
}

// 🔺 action might also be a react component that consumes state
export const createUpdate = <State>(action: Action<State>): Update<State> => {
  return { action };
};

export const createUpdateQueue = <Action>() => {
  return {
    shared: { pending: null },
    dispatch: null,
  } as UpdateQueue<Action>;
};

export const enqueueUpdate = <Action>(updateQueue: UpdateQueue<Action>, update: Update<Action>) => {
  updateQueue.shared.pending = update;
};

export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null
): State => {
  if (pendingUpdate !== null) {
    const action = pendingUpdate.action;
    if (action instanceof Function) {
      baseState = action(baseState);
    } else {
      baseState = action;
    }
  }
  return baseState;
};
