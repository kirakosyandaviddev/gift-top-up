import {FC} from 'react';

import {TonIcon16} from '../../../../components/icons/TonIcon16';
import {Price} from '../../../../etities/types/Price';
import {ArrowRight22} from '../../../../components/icons/ArrowRight22';

import s from './SwapGiftCard.module.css';

type PropsType = {
  price: Price;
};

export const SwapGiftCard: FC<PropsType> = ({price}) => {
  return (
    <div className={s.container}>
      <img
        className={s.img}
        src={price.photoUrl}
        width={50}
        height={50}
        draggable={false}
      />

      <div className={s.grid}>
        <div className={s.title}>{price.title}</div>

        <div className={s.arrowContainer}>
          <ArrowRight22 />
        </div>

        <p className={s.price}>
          <span>{price.price}</span> <TonIcon16 />
        </p>
      </div>
    </div>
  );
};
