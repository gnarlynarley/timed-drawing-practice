import React from 'react';

import useDirectory from '~src/lib/hooks/useDirectory';
import useDirectoryFiles from '../hooks/useDirectoryFiles';

import Button from '~src/lib/components/Button';
import Input from '~src/lib/components/Input';

import $ from './ConfigurationPage.module.css';
import Loading from '../components/Loading';
import { FormValue } from '../models';

function ShowFiles() {
  const { files } = useDirectoryFiles();

  if (!files || files.length === 0) {
    return <p>No files loaded.</p>;
  }

  return (
    <>
      <p>
        Loaded <strong>{files.length}</strong> references.
      </p>
    </>
  );
}

type Props = {
  duration: FormValue<number>;
  amount: FormValue<number>;
  onStartClick: () => void;
};

function ConfigurationPage({ duration, amount, onStartClick }: Props) {
  const { selectDirectory } = useDirectory();

  return (
    <div className={$.container}>
      <Button onClick={selectDirectory}>Select directory</Button>
      <Input label="Duration" type="number" {...duration} />
      <Input label="Amount" type="number" {...amount} />
      <React.Suspense fallback={<Loading />}>
        <ShowFiles />
      </React.Suspense>
      <Button onClick={onStartClick}>Start</Button>
    </div>
  );
}

export default ConfigurationPage;
