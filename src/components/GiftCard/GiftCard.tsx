import {FC} from 'react';

import {GiftType} from '../../etities/types/GiftType';

import s from './GiftCard.module.css';
import {TonIcon12} from '../icons/TonIcon12';

type PropsType = {
  gift: GiftType;
};

const getHex = (color: number) =>
  '#' + color.toString(16).toUpperCase().padStart(6, '0');

export const GiftCard: FC<PropsType> = ({gift}) => {
  return (
    <div
      className={s.container}
      style={{backgroundColor: getHex(gift.backdrop.edgeColor)}}
    >
      <img
        src={`https://cdn.changes.tg/gifts/models/${gift.title}/png/${gift.model.name}.png`}
        width={100}
        height={100}
      />
      <p className={s.title}>{`${gift.title || ''} #${gift.num}`}</p>
      <div className={s.buttonList}>
        <button className={s.button}>Add to Profile</button>
        <button className={s.button}>
          Sell for {gift.ton} <TonIcon12 />
        </button>
        {/* <button className={s.button}>
          {gift.ton} <TonIcon12 />
        </button> */}
      </div>
    </div>
  );
};
