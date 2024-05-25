import $ from './Button.module.css';

type Props = React.PropsWithChildren<{
  onClick: () => void;
  icon?: React.ReactNode;
}>;

export default function Button({ onClick, icon, children }: Props) {
  return (
    <button className={$.button} type="button" onMouseDown={onClick}>
      {icon ?? children}
    </button>
  );
}
