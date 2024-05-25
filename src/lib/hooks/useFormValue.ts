import React from 'react';
import { FormValue } from '~src/lib/models';

export default function useFormValue<T extends string | number | Date>(
  initialValue: T
): FormValue<T> {
  const [value, setValue] = React.useState(initialValue);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (typeof initialValue === 'number') {
      setValue(ev.target.valueAsNumber as T);
    } else if (initialValue instanceof Date) {
      setValue(ev.target.valueAsDate as T);
    } else {
      setValue(ev.target.value as T);
    }
  };

  return {
    value,
    onChange,
  };
}
