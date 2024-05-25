import React from 'react';
import { FileEntry } from '../models';

export default function FileImage({
  file,
  className,
}: {
  file: FileEntry;
  className?: string;
}) {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    let createdObjectUrl: string | null = null;
    file.fileHandle.getFile().then((file) => {
      if (active) {
        createdObjectUrl = URL.createObjectURL(file);
        setUrl(createdObjectUrl);
      }
    });

    return () => {
      createdObjectUrl && URL.revokeObjectURL(createdObjectUrl);
      active = false;
    };
  }, [file.fileHandle]);

  if (!url) return null;

  return <img src={url} className={className} alt="" />;
}
