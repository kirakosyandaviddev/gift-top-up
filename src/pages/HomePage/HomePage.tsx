import {BalanceCard} from './components/BalanceCard/BalanceCard';
import {RouletteCard} from './components/RouletteCard/RouletteCard';
import {GiftboxesCard} from './components/GiftboxesCard/GiftboxesCard';
import {MyGifts} from '../../components/MyGifts/MyGifts';
import {useGetConfigQuery} from '../../hooks/data/queries/useGetConfigQuery';
import {useWebApp} from '../../hooks/useWebApp';

import s from './HomePage.module.css';
import {useEffect} from 'react';

export const HomePage = () => {
  const {data} = useGetConfigQuery();
  const WebApp = useWebApp();
  WebApp.BackButton.hide();

  useEffect(() => {
    if (WebApp?.BackButton?.isVisible) {
      WebApp?.BackButton.hide();
    }
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <h3 className={s.title}>Gifts Games</h3>
      </div>

      <BalanceCard balance={data?.data?.user?.balance || 0} />
      <RouletteCard />
      <GiftboxesCard />

      <MyGifts />
    </div>
  );
};
