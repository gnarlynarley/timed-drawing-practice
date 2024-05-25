export type FileEntry = {
  id: string;
  path: string[];
  name: string;
  fileHandle: FileSystemFileHandle;
};

export type FormValue<T extends string | number | Date> = {
  value: T;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
