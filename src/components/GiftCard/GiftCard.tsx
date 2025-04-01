import {FC} from 'react';

import {Gift} from '../../etities/types/Gift';
import {TonIcon12} from '../icons/TonIcon12';

import s from './GiftCard.module.css';

type PropsType = {
  gift: Gift;
  showPrice?: boolean;
  onAdd?: (giftId: string) => void;
  onSell?: (giftId: string) => void;
};

const getHex = (color: number) =>
  '#' + color.toString(16).toUpperCase().padStart(6, '0');

export const GiftCard: FC<PropsType> = ({
  gift,
  onAdd,
  onSell,
  showPrice = false,
}) => {
  return (
    <div
      className={s.container}
      style={{backgroundColor: getHex(gift.backdrop.edgeColor)}}
    >
      <div className={s.imgContainer}>
        <img className={s.img} src={gift.photoUrl} />
        <p className={s.title}>{`${gift.title || ''} #${gift.num}`}</p>
      </div>

      {(onAdd || onSell || showPrice) && (
        <div className={s.buttonList}>
          {onAdd && (
            <button className={s.button} onClick={() => onAdd(gift.id)}>
              <span>Add to Profile</span>
            </button>
          )}
          {onSell && (
            <button
              className={s.button}
              onClick={() => {
                onSell(gift.id);
              }}
            >
              <span>Sell for {gift.ton}</span> <TonIcon12 />
            </button>
          )}
          {showPrice && (
            <button className={s.button}>
              <span>{gift.ton}</span> <TonIcon12 />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
