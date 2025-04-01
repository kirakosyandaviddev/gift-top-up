import {useGetConfigQuery} from '../../../../hooks/data/queries/useGetConfigQuery';
import {GiftCard} from '../../../../components/GiftCard/GiftCard';
import {Tabs} from '../../../../components/Tabs/Tabs';
import {Gift} from '../../../../etities/types/Gift';

import s from './Gifts.module.css';
import {SwapGiftCard} from '../SwapGiftCard/SwapGiftCard';

export const Gifts = () => {
  const {data} = useGetConfigQuery();

  const allGifts: Gift[] = [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
  ] as Gift[];

  const profileGifts = data?.data?.user?.gifts || [];

  const emptyStateMarkup = (
    <div className={s.emptyContainer}>
      <p className={s.emptyText}>No gifts yet...</p>
    </div>
  );

  return (
    <Tabs defaultTab="all">
      <Tabs.List>
        <Tabs.Tab tab="all">All Gifts</Tabs.Tab>
        <Tabs.Tab tab="my">My Gifts</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel tab="all">
        {!!allGifts.length ? (
          <div className={s.list}>
            {allGifts.map((gift) => (
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
              <GiftCard key={gift.id} gift={gift} showPrice />
            ))}
          </div>
        ) : (
          emptyStateMarkup
        )}
      </Tabs.Panel>
    </Tabs>
  );
};
