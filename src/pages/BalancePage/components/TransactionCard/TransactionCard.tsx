import {FC} from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import {TonIcon16} from '../../../../components/icons/TonIcon16';
import {Transaction} from '../../../../etities/types/Transaction';

import s from './TransactionCard.module.css';

type PropsType = {
  transaction: Transaction;
};

export const TransactionCard: FC<PropsType> = ({transaction}) => {
  const {type, value, createdAt, payload} = transaction;

  const isSpin = type === 'spin';

  return (
    <div className={s.container}>
      {isSpin ? (
        <img className={s.img} src={payload.photoUrl} />
      ) : (
        <img className={s.img} src="public/img/incoming.png" />
      )}

      <div className={s.textContainer}>
        <p className={s.title}>{isSpin ? 'One Spin' : 'Top Up'}</p>
        {isSpin && (
          <p className={s.text}>{`${payload.title || ''} #${payload.num}`}</p>
        )}
      </div>

      <div className={s.detailsContainer}>
        <p className={classNames(s.price, {[s.success]: !isSpin})}>
          <span>
            {isSpin ? '-' : '+'}
            {value}
          </span>{' '}
          <TonIcon16 />
        </p>
        <p className={s.date}>{dayjs(createdAt).format('MMM D HH:mm')}</p>
      </div>
    </div>
  );
};
