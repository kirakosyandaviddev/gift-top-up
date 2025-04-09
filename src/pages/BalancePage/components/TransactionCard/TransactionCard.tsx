import {FC} from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import {TonIcon16} from '../../../../components/icons/TonIcon16';
import {Transaction} from '../../../../etities/types/Transaction';

import s from './TransactionCard.module.css';

type PropsType = {
  transaction: Transaction;
};

const TITLES = {
  spin: 'One Spin',
  swap_gift: 'Top Up',
  pick_up_gift: 'Top Up',
  deposit_ton: 'Top Up',
  deposit_gift: 'Top Up',
  deposit_partner: 'Top Up',
};

export const TransactionCard: FC<PropsType> = ({transaction}) => {
  const {type, value, createdAt, payload} = transaction;

  const isIncoming = ['swap_gift', 'deposit_ton', 'deposit_gift'].includes(
    type,
  );

  const hasGift = typeof payload !== 'string';

  return (
    <div className={s.container}>
      {hasGift ? (
        <img
          className={s.img}
          src={payload.photoUrl}
          width={50}
          height={50}
          draggable={false}
        />
      ) : (
        <img
          className={s.img}
          src="img/incoming.png"
          width={50}
          height={50}
          draggable={false}
        />
      )}

      <div className={s.textContainer}>
        <p className={s.title}>{TITLES[type]}</p>
        {hasGift && (
          <p className={s.text}>{`${payload.title || ''} #${payload.num}`}</p>
        )}
      </div>

      <div className={s.detailsContainer}>
        <p className={classNames(s.price, {[s.success]: isIncoming})}>
          <span>
            {isIncoming ? '+' : '-'}
            {value}
          </span>{' '}
          <TonIcon16 />
        </p>
        <p className={s.date}>{dayjs(createdAt).format('MMM D HH:mm')}</p>
      </div>
    </div>
  );
};
