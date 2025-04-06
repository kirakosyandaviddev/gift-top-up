import {FC} from 'react';

import {TonIcon16} from '../../../../components/icons/TonIcon16';
import {Gift} from '../../../../etities/types/Gift';
import {ArrowRight22} from '../../../../components/icons/ArrowRight22';

import s from './SwapGiftCard.module.css';

type PropsType = {
  gift: Gift;
};

export const SwapGiftCard: FC<PropsType> = ({gift}) => {
  return (
    <div className={s.container}>
      <img className={s.img} src={gift.model.photoUrl} />

      <div className={s.grid}>
        <div className={s.title}>{gift.title}</div>

        <div className={s.arrowContainer}>
          <ArrowRight22 />
        </div>

        <p className={s.price}>
          <span>{gift.min}</span> <TonIcon16 />
        </p>
      </div>
    </div>
  );
};
