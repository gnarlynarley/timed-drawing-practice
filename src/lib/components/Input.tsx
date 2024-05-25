import React from 'react';
import $ from './Input.module.css';

type Props = {
  label: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Input({ type, label, value, onChange }: Props) {
  const id = React.useId();

  return (
    <div className={$.container}>
      <label htmlFor={id} className={$.label}>
        {label}
      </label>
      <input
        id={id}
        className={$.input}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
