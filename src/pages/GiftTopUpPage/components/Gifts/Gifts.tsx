import {FC} from 'react';
import {useSearchParams} from 'react-router-dom';

import {GiftCard} from '../../../../components/GiftCard/GiftCard';
import {Tabs} from '../../../../components/Tabs/Tabs';
import {Gift} from '../../../../etities/types/Gift';
import {useWebApp} from '../../../../hooks/useWebApp';
import {useSwapGiftToTonMutation} from '../../../../hooks/data/mutations/useSwapGiftToTonMutation';

import {SwapGiftCard} from '../SwapGiftCard/SwapGiftCard';
import s from './Gifts.module.css';

type PropsType = {
  prices?: Gift[];
  nfts?: Gift[];
  gifts?: Gift[];
};

export const Gifts: FC<PropsType> = ({prices = [], nfts = [], gifts = []}) => {
  const WebApp = useWebApp();
  const {mutate: swapGiftToTon} = useSwapGiftToTonMutation();
  const [searchParams] = useSearchParams();
  console.log('searchParams', searchParams.get('tab'));

  // nfts should be after gifts
  const profileGifts = [
    ...gifts.filter((g) => g.status === 'awaiting'),
    ...nfts,
  ];

  const onPriceClick = (gift: Gift) => {
    // When the Gift is from nfts
    if (!gift.status) {
      WebApp.openTelegramLink(`https://t.me/m/CtWO8BXgMzlk`);
      return;
    }

    WebApp.showPopup(
      {
        buttons: [
          {
            id: '1',
            text: 'Confirm',
            type: 'ok',
          },
          {
            id: '0',
            text: 'Cancel',
            type: 'cancel',
          },
        ],
        message: 'Instant sale',
        title: 'Are you sure you want to sell?',
      },
      (id: string) => {
        if (id === '1') {
          swapGiftToTon(gift.id);
        }
      },
    );
  };

  const emptyStateMarkup = (
    <div className={s.emptyContainer}>
      <p className={s.emptyText}>No gifts yet...</p>
    </div>
  );

  return (
    <Tabs defaultTab={searchParams.get('tab') || 'all'}>
      <Tabs.List>
        <Tabs.Tab tab="all">All Gifts</Tabs.Tab>
        <Tabs.Tab tab="my">My Gifts</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel tab="all">
        {!!prices.length ? (
          <div className={s.list}>
            {prices.map((gift) => (
              <SwapGiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        ) : (
          emptyStateMarkup
        )}
      </Tabs.Panel>

      <Tabs.Panel tab="my">
        {!!profileGifts.length ? (
          <div className={s.container}>
            {profileGifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} onPrice={onPriceClick} />
            ))}
          </div>
        ) : (
          emptyStateMarkup
        )}
      </Tabs.Panel>
    </Tabs>
  );
};
