import React from 'react';
import { get, set } from 'idb-keyval';
import { createStore } from '~src/lib/utils/store';
import useStore from './useStore';

const IDB_KEY = 'saved-directory-handle';
const store = createStore<Promise<FileSystemDirectoryHandle | undefined>>(
  get<FileSystemDirectoryHandle>(IDB_KEY)
);

export default function useDirectory() {
  const { value, setValue } = useStore(store);
  const directoryHandle = React.use(value);

  return {
    directoryHandle,
    async selectDirectory() {
      try {
        const directoryHandle = await window.showDirectoryPicker();
        await set('saved-directory-handle', directoryHandle);
        setValue(Promise.resolve(directoryHandle));
      } catch (error) {
        console.error(error);
      }
    },
  };
}
