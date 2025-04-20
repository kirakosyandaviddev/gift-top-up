import {FC} from 'react';

import {Gift} from '../../etities/types/Gift';
import {TonIcon12} from '../icons/TonIcon12';
import {useWebApp} from '../../hooks/useWebApp';

import s from './GiftCard.module.css';
import {Patterns} from './Patterns/Patterns';

type PropsType = {
  gift: Gift;
  onAdd?: (giftId: string) => void;
  onSell?: (giftId: string) => void;
  onPrice?: (gift: Gift) => void;
};

export const getHex = (color: number) =>
  '#' + color.toString(16).toUpperCase().padStart(6, '0');

export const GiftCard: FC<PropsType> = ({gift, onAdd, onSell, onPrice}) => {
  const WebApp = useWebApp();

  const onCardClick = () => {
    WebApp.openTelegramLink(`https://t.me/nft/${gift.slug}&quot`);
  };

  return (
    <div
      className={s.container}
      style={{backgroundColor: getHex(gift.backdrop.edgeColor)}}
    >
      <div className={s.imgContainer} role="button" onClick={onCardClick}>
        <img
          className={s.img}
          src={gift.model.photoUrl}
          width={100}
          height={100}
          draggable={false}
        />
        <p className={s.title}>{`${gift.title || ''} #${gift.num}`}</p>
        <Patterns animationUrl={gift.pattern.animationUrl} title={gift.title} />
      </div>

      {(onAdd || onSell || onPrice) && (
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
              <span>Sell for {gift.avg}</span> <TonIcon12 />
            </button>
          )}
          {onPrice && (
            <button
              className={s.button}
              onClick={() => {
                onPrice(gift);
              }}
            >
              <span>{gift.avg}</span> <TonIcon12 />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
