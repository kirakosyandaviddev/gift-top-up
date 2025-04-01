import classNames from 'classnames';

import {TonIcon16} from '../../../../components/icons/TonIcon16';
import {GiftIcon16} from '../../../../components/icons/GiftIcon16';

import s from './TopUpWith.module.css';

export const TopUpWith = () => {
  return (
    <div className={s.wrapper}>
      <p className={s.text}>top up with...</p>
      <div className={s.container}>
        <button className={classNames(s.btn, s.ton)}>
          <TonIcon16 />
          <span>TON</span>
        </button>
        <button className={classNames(s.btn, s.gifts)}>
          <GiftIcon16 />
          <span>Gifts</span>
        </button>
      </div>
    </div>
  );
};
