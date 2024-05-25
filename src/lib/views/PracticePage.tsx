import React from 'react';

import useDirectoryFiles from '../hooks/useDirectoryFiles';
import useStore from '../hooks/useStore';

import Button from '../components/Button';
import { CloseIcon, PlayIcon, PauseIcon } from '../components/icons';
import FileImage from '../components/FileImage';
import PracticeMachine from '../PracticeMachine';
import DurationBar from '../components/DurationBar';

import $ from './PracticePage.module.css';

type Props = {
  duration: number;
  amount: number;
  onCloseClick: () => void;
};

export default function PracticePage({
  duration,
  amount,
  onCloseClick,
}: Props) {
  const { files } = useDirectoryFiles();
  const [practice] = React.useState(() => {
    const instance = new PracticeMachine(duration, amount, files);
    instance.play();
    return instance;
  });
  const { value: currentFile } = useStore(practice.currentFile);
  const { value: history } = useStore(practice.history);
  const { value: playing } = useStore(practice.playing);

  return (
    <div className={$.container}>
      <div className={$.header}>
        <Button onClick={() => practice.next()}>{'Next'}</Button>
        <Button onClick={onCloseClick} icon={<CloseIcon />} />
        <Button
          onClick={() => practice.toggle()}
          icon={playing ? <PauseIcon /> : <PlayIcon />}
        />
        <span>{history.length}</span>
      </div>
      <div className={$.imageContainer}>
        {currentFile && <FileImage className={$.image} file={currentFile} />}
      </div>
      <div className={$.footer}>
        <DurationBar duration={duration} timeStore={practice.time} />
      </div>
    </div>
  );
}
