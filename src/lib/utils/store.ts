export type Store<T> = {
  getState: () => T;
  setState: (newState: T) => void;
  subscribe: (callback: () => void) => () => void;
};

export function createStore<T>(initialState: T): Store<T> {
  let state: T = initialState;
  const subscribers: ((state: T) => void)[] = [];

  function getState(): T {
    return state;
  }

  function setState(newState: T) {
    state = newState;
    subscribers.forEach((callback) => callback(state!));
  }

  function subscribe(callback: () => void) {
    subscribers.push(callback);
    return () => unsubscribe(callback);
  }

  function unsubscribe(callback: (state: T) => void) {
    const index = subscribers.indexOf(callback);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  }

  return {
    getState,
    setState,
    subscribe,
  };
}
