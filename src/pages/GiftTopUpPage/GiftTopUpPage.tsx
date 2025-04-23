import {CopyNote} from './components/CopyNote/CopyNote';
import {Gifts} from './components/Gifts/Gifts';
import {WarningNote} from './components/WarningNote/WarningNote';
import {useGetPrices} from '../../hooks/data/queries/useGetPrices';
import {useGetFullGiftsProfile} from '../../hooks/data/queries/useGetFullGiftsProfile';
import {useGetFullGifts} from '../../hooks/data/queries/useGetFullGifts';
import {useNewPrice} from '../../hooks/subscriptions/useNewPrice';
import {useNewNFT} from '../../hooks/subscriptions/useNewNFT';
import {useUpdatePrice} from '../../hooks/subscriptions/useUpdatePrice';
import {useNewGift} from '../../hooks/subscriptions/useNewGift';
import {useUpdateGift} from '../../hooks/subscriptions/useUpdateGift';

import titleOverlay from '/svg/topUpPage-title-overlay.svg';

import s from './GiftTopUpPage.module.css';

export const GiftTopUpPage = () => {
  useNewGift();
  useUpdateGift();
  useNewPrice();
  useUpdatePrice();
  useNewNFT();

  const {data: prices} = useGetPrices();
  const {data: gifts} = useGetFullGifts();
  const {data: giftsProfile} = useGetFullGiftsProfile();

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <h3 className={s.title}>Gift Top Up</h3>
        <img src={titleOverlay} draggable={false} />
      </div>

      <CopyNote />
      <WarningNote />
      <Gifts
        prices={prices?.data}
        giftsProfile={giftsProfile?.data}
        gifts={gifts?.data}
      />
    </div>
  );
};
