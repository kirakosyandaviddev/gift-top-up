import {useGetConfigQuery} from '../../hooks/data/queries/useGetConfigQuery';
import {useBackButton} from '../../hooks/data/useBackButton';
import {CopyNote} from './components/CopyNote/CopyNote';
import {Gifts} from './components/Gifts/Gifts';
import {WarningNote} from './components/WarningNote/WarningNote';

import s from './GiftTopUpPage.module.css';

export const GiftTopUpPage = () => {
  useBackButton();
  const {data} = useGetConfigQuery();

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <h3 className={s.title}>Gift Top Up</h3>
      </div>

      <CopyNote />
      <WarningNote />
      <Gifts
        prices={data?.data?.prices}
        nfts={data?.data?.nfts}
        gifts={data?.data?.user?.gifts}
      />
    </div>
  );
};
