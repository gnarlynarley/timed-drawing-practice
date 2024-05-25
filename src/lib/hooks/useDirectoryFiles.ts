import { FileEntry } from '~src/lib/models';
import useDirectory from './useDirectory';
import React from 'react';

const cache = new WeakMap<FileSystemDirectoryHandle, Promise<FileEntry[]>>();

async function getFiles(
  handle: FileSystemDirectoryHandle | undefined,
  files: FileEntry[] = [],
  path: string[] = []
) {
  if (!handle) return [];
  for await (const entry of handle.values()) {
    if (entry.kind === 'directory') {
      await getFiles(entry, files, [...path, entry.name]);
    } else {
      const isImage = /\.(jpg|jpeg|png|gif)$/i.test(entry.name);
      if (isImage) {
        files.push({
          id: Math.random().toString(),
          fileHandle: entry,
          path,
          name: entry.name,
        });
      }
    }
  }
  return files;
}

const filesFallback = Promise.resolve([] as FileEntry[]);

export default function useDirectoryFiles() {
  const { directoryHandle } = useDirectory();
  let filesPromise: Promise<FileEntry[]> | undefined = undefined;
  if (directoryHandle) {
    filesPromise = directoryHandle && cache.get(directoryHandle);
    if (!filesPromise) {
      filesPromise = getFiles(directoryHandle);
      cache.set(directoryHandle, filesPromise);
    }
  }
  const files = React.use(filesPromise ?? filesFallback);

  return {
    files: files,
  };
}
