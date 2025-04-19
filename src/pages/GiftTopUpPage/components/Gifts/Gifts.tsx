import {FC} from 'react';
import {useSearchParams} from 'react-router-dom';

import {GiftCard} from '../../../../components/GiftCard/GiftCard';
import {Tabs} from '../../../../components/Tabs/Tabs';
import {Gift} from '../../../../etities/types/Gift';
import {useWebApp} from '../../../../hooks/useWebApp';
import {useSwapGiftToTonMutation} from '../../../../hooks/data/mutations/useSwapGiftToTonMutation';
import {Price} from '../../../../etities/types/Price';
import {PriceCard} from '../PriceCard/PriceCard';

import s from './Gifts.module.css';

type PropsType = {
  prices?: Price[];
  giftsProfile?: Gift[];
  gifts?: Gift[];
};

export const Gifts: FC<PropsType> = ({
  prices = [],
  giftsProfile = [],
  gifts = [],
}) => {
  const WebApp = useWebApp();
  const {mutate: swapGiftToTon} = useSwapGiftToTonMutation();
  const [searchParams] = useSearchParams();

  const sortedPrices = [...prices].sort((a, b) => b.price - a.price);

  // giftsProfile should be after gifts
  const profileGifts = [
    ...gifts.filter((g) => g.status === 'awaiting'),
    ...giftsProfile,
  ];

  const onPriceClick = (gift: Gift) => {
    // When the Gift is from giftsProfile
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
        {!!sortedPrices.length ? (
          <div className={s.list}>
            {sortedPrices.map((price) => (
              <PriceCard key={price.id} price={price} />
            ))}
          </div>
        ) : (
          emptyStateMarkup
        )}
      </Tabs.Panel>

      <Tabs.Panel tab="my">
        {!!profileGifts.length ? (
          <div className={s.container}>
            {profileGifts.map((gift, i) => (
              <GiftCard
                key={`${gift.id}-${i}`}
                gift={gift}
                onPrice={onPriceClick}
              />
            ))}
          </div>
        ) : (
          emptyStateMarkup
        )}
      </Tabs.Panel>
    </Tabs>
  );
};
