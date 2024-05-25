import useStore from '../hooks/useStore';
import { Store } from '../utils/store';
import $ from './DurationBar.module.css';

type Props = {
  duration: number;
  timeStore: Store<number>;
};

export default function DurationBar({ duration, timeStore }: Props) {
  const { value: time } = useStore(timeStore);
  const elapsed = time / duration;

  return (
    <div className={$.bar} style={{ ['--elapsed' as string]: elapsed }}></div>
  );
}
