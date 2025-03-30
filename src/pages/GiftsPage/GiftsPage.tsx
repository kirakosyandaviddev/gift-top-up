import {useNavigate} from 'react-router-dom';
import {GiftCard} from '../../components/GiftCard/GiftCard';
import {Tabs} from '../../components/Tabs/Tabs';
import {useGetConfigQuery} from '../../hooks/data/queries/useGetConfigQuery';
import {useWebApp} from '../../hooks/useWebApp';

import s from './GiftsPage.module.css';

export const GiftsPage = () => {
  // TODO: Handle this logic and make it reusable
  const navigate = useNavigate();
  const WebApp = useWebApp();
  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    navigate(-1);
  });

  const {data} = useGetConfigQuery();

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
          <div className={s.container}>
            {data?.data?.user?.gifts?.map((gift) => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel tab="profile">
          <p>Content for myProfile</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
