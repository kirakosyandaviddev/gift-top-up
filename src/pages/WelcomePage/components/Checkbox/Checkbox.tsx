import {FC} from 'react';

import s from './Checkbox.module.css';

type PropsType = {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
export const Checkbox: FC<PropsType> = ({checked, onChange}) => {
  return (
    <label className={s.label}>
      <input
        className={s.checkbox}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      {!checked && <span className={s.notChecked}></span>}
      {checked && (
        <span className={s.checked}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.805 1.17096L3.85448 7.56502L2.0712 5.18584C1.79876 4.8141 1.55108 4.71496 1.24149 4.71496C0.721358 4.71496 0.34984 5.12389 0.34984 5.63194C0.34984 5.87977 0.436528 6.1276 0.609904 6.33826L2.9133 9.22545C3.21052 9.62198 3.52012 9.7707 3.90401 9.7707C4.27553 9.7707 4.59752 9.59724 4.83281 9.22545L9.24151 2.23664C9.39013 2.01359 9.52633 1.75338 9.52633 1.50553C9.52633 0.972698 9.08046 0.650513 8.58514 0.650513C8.28789 0.650513 8.00308 0.823996 7.805 1.17096Z"
              fill="white"
            />
          </svg>
        </span>
      )}
      <span className={s.labelText}>I accept the</span>
    </label>
  );
};
