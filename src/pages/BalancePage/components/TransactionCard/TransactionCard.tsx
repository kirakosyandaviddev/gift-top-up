import {FC} from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import {TonIcon16} from '../../../../components/icons/TonIcon16';

import s from './TransactionCard.module.css';
import {Transaction} from '../../../../etities/types/Transaction';

type PropsType = {
  transaction: Transaction;
};

const TITLES = {
  spin: 'One Spin',
  deposit_ton: 'D Ton',
  deposit_gift: 'D Gift',
  deposit_partner: 'D Partner',
};

export const TransactionCard: FC<PropsType> = ({transaction}) => {
  const {type, value, createdAt, payload} = transaction;

  return (
    <div className={s.container}>
      {type !== 'spin' && (
        <img className={s.img} src="public/img/incoming.png" />
      )}
      {type === 'spin' && <img className={s.img} src={payload.photoUrl} />}

      <div className={s.textContainer}>
        <p className={s.title}>{TITLES[type]}</p>
        {type === 'spin' && (
          <p className={s.text}>{`${payload.title || ''} #${payload.num}`}</p>
        )}
      </div>

      <div className={s.detailsContainer}>
        <p className={classNames(s.price)}>
          <span>-{value}</span> <TonIcon16 />
        </p>
        <p className={s.date}>{dayjs(createdAt).format('MMM D HH:mm')}</p>
      </div>
    </div>
  );
};
