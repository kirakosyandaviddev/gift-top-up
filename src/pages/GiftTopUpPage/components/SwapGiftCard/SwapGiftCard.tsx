import {FC} from 'react';

import {TonIcon16} from '../../../../components/icons/TonIcon16';
import {Gift} from '../../../../etities/types/Gift';

import s from './SwapGiftCard.module.css';
import {ArrowRight22} from '../../../../components/icons/ArrowRight22';

type PropsType = {
  gift: Gift;
};

export const SwapGiftCard: FC<PropsType> = () => {
  return (
    <div className={s.container}>
      <img className={s.img} src="public/img/cap.png" />

      <div className={s.wrapper}>
        <div className={s.titleContainer}>
          <p className={s.title}>Durov’s Cap</p>
        </div>

        <div className={s.arrowContainer}>
          <ArrowRight22 />
        </div>

        <p className={s.price}>
          <span>31</span> <TonIcon16 />
        </p>
      </div>
    </div>
  );
};
