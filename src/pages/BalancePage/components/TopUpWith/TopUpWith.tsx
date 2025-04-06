import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {useTonConnectUI} from '@tonconnect/ui-react';
import {beginCell, toNano} from '@ton/ton';

import {TonIcon16} from '../../../../components/icons/TonIcon16';
import {GiftIcon16} from '../../../../components/icons/GiftIcon16';
import {ROUTES} from '../../../../consts/routes';
import {useGetConfigQuery} from '../../../../hooks/data/queries/useGetConfigQuery';
import {useWebApp} from '../../../../hooks/useWebApp';

import s from './TopUpWith.module.css';

export const TopUpWith = () => {
  const navigate = useNavigate();
  const [tonConnectUI] = useTonConnectUI();
  const {data} = useGetConfigQuery();
  const WebApp = useWebApp();

  const handleTopUp = (amount: number) => {
    const payload = beginCell()
      .storeUint(0, 32)
      .storeStringTail(data?.data?.user.id || '')
      .endCell()
      .toBoc()
      .toString('base64');

    try {
      tonConnectUI.sendTransaction({
        validUntil: Date.now() + 5 * 60 * 1000,
        messages: [
          {
            address: data?.data?.address || '',
            amount: toNano(amount).toString(),
            payload,
          },
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onTopUpByTon = () => {
    const amount = Number(
      window.prompt('Enter the amount you want to deposit', ''),
    );

    if (amount === null || amount === 0 || Number.isNaN(amount)) {
      WebApp.showPopup({
        buttons: [
          {
            id: '0',
            text: 'Cancel',
            type: 'cancel',
          },
        ],
        message: 'Enter the amount you want to deposit with numbers',
        title: 'Invalid amount!',
      });
      return;
    }

    handleTopUp(amount);
  };

  return (
    <div className={s.wrapper}>
      <p className={s.text}>top up with...</p>
      <div className={s.container}>
        <button className={classNames(s.btn, s.ton)} onClick={onTopUpByTon}>
          <TonIcon16 />
          <span>TON</span>
        </button>
        <button
          className={classNames(s.btn, s.gifts)}
          onClick={() => {
            navigate(`${ROUTES.GIFT_TOP_UP}?tab=my`);
          }}
        >
          <GiftIcon16 />
          <span>Gifts</span>
        </button>
      </div>
    </div>
  );
};
