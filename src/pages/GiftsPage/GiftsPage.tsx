import {GiftCard} from '../../components/GiftCard/GiftCard';
import {Tabs} from '../../components/Tabs/Tabs';
import {usePickUpGiftMutation} from '../../hooks/data/mutations/usePickUpGiftMutation';
import {useSwapGiftToTonMutation} from '../../hooks/data/mutations/useSwapGiftToTonMutation';
import {useGetConfigQuery} from '../../hooks/data/queries/useGetConfigQuery';
import {useBackButton} from '../../hooks/data/useBackButton';
import {useWebApp} from '../../hooks/useWebApp';

import s from './GiftsPage.module.css';

export const GiftsPage = () => {
  useBackButton();
  const WebApp = useWebApp();
  const {data} = useGetConfigQuery();
  const {mutate: pickUpGift, isPending: pickUpGiftPending} =
    usePickUpGiftMutation();
  const {mutate: swapGiftToTon, isPending: swapGiftToTonPending} =
    useSwapGiftToTonMutation();

  const botGifts =
    data?.data?.user?.gifts?.filter(({status}) =>
      ['awaiting', 'swap'].includes(status || ''),
    ) || [];

  const profileGifts = data?.data?.nfts || [];

  const onAddClick = (giftId: string) => {
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
        message:
          'This gift will be added to your profile. This action cannot be undone.',
        title: 'Send gift to your profile?',
      },
      (id: string) => {
        if (id === '1') {
          pickUpGift(giftId);
        }
      },
    );
  };

  const onSellClick = (giftId: string) => {
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
          swapGiftToTon(giftId);
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
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <h3 className={s.title}>My Gifts</h3>
      </div>

      <Tabs defaultTab="bot">
        <Tabs.List>
          <Tabs.Tab tab="bot">Bot</Tabs.Tab>
          <Tabs.Tab tab="profile">Profile</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel tab="bot">
          {!!botGifts.length ? (
            <div className={s.container}>
              {botGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onAdd={
                    gift.status === 'swap'
                      ? undefined
                      : (id) => {
                          if (pickUpGiftPending) return;
                          onAddClick(id);
                        }
                  }
                  onSell={
                    gift.status === 'swap'
                      ? undefined
                      : (id) => {
                          if (swapGiftToTonPending) return;
                          onSellClick(id);
                        }
                  }
                />
              ))}
            </div>
          ) : (
            emptyStateMarkup
          )}
        </Tabs.Panel>

        <Tabs.Panel tab="profile">
          {!!profileGifts.length ? (
            <div className={s.container}>
              {profileGifts?.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onSell={() => {
                    WebApp.openTelegramLink(`https://t.me/m/CtWO8BXgMzlk`);
                  }}
                />
              ))}
            </div>
          ) : (
            emptyStateMarkup
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
