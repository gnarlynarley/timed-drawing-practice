import React from 'react';
import { Store } from '../utils/store';

export default function useStore<T>(store: Store<T>) {
  const value = React.useSyncExternalStore(store.subscribe, store.getState);

  return {
    value,
    setValue(next: T) {
      store.setState(next);
    },
  };
}
