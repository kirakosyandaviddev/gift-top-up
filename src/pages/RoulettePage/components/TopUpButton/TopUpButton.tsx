import {FC} from 'react';

import {PlusIcon16} from '../../../../components/icons/PlusIcon16';

import s from './TopUpButton.module.css';

type PropsType = {
  onClick: () => void;
};

export const TopUpButton: FC<PropsType> = ({onClick}) => {
  return (
    <button className={s.container} onClick={onClick}>
      <PlusIcon16 />
      <span>Top Up Balance to Spin</span>
    </button>
  );
};
