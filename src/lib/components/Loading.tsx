import $ from './Loading.module.css';

export default function Loading() {
  return (
    <div className={$.loading}>
      <div className={$.dot} />
      <div className={$.dot} />
      <div className={$.dot} />
    </div>
  );
}
