import {FC} from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import {Transaction} from '../../BalancePage';
import {TonIcon16} from '../../../../components/icons/TonIcon16';

import s from './TransactionCard.module.css';

type PropsType = {
  transaction: Transaction;
};

export const TransactionCard: FC<PropsType> = () => {
  return (
    <div className={s.container}>
      <img className={s.img} src="public/img/incoming.png" />

      <div className={s.textContainer}>
        <p className={s.title}>One Spin</p>
        <p className={s.text}>Gift Name #0</p>
      </div>

      <div className={s.detailsContainer}>
        <p className={classNames(s.price, s.success)}>
          <span>+31</span> <TonIcon16 />
        </p>
        <p className={s.date}>{dayjs().format('MMM D HH:mm')}</p>
      </div>
    </div>
  );
};
