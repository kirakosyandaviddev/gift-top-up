import {CopyNote} from './components/CopyNote/CopyNote';
import {Gifts} from './components/Gifts/Gifts';
import {WarningNote} from './components/WarningNote/WarningNote';
import {useGetPrices} from '../../hooks/data/queries/useGetPrices';
import {useGetFullGiftsProfile} from '../../hooks/data/queries/useGetFullGiftsProfile';
import {useGetFullGifts} from '../../hooks/data/queries/useGetFullGifts';

import titleOverlay from '/svg/topUpPage-title-overlay.svg';

import s from './GiftTopUpPage.module.css';

export const GiftTopUpPage = () => {
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
