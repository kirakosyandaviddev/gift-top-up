import {FC, useEffect} from 'react';
import {TonConnectButton, useTonWallet} from '@tonconnect/ui-react';

import {TonIcon30} from '../../../../components/icons/TonIcon30';

import s from './BalanceInfo.module.css';
import {ROUTES} from '../../../../consts/routes';
import {useNavigate} from 'react-router-dom';

type PropsType = {
  balance?: number;
};

export const BalanceInfo: FC<PropsType> = ({balance = 0}) => {
  const wallet = useTonWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!wallet) {
      navigate(ROUTES.WELCOME);
    }
  }, [wallet]);

  return (
    <div className={s.container}>
      <p className={s.title}>
        <span>{balance}</span>
        <TonIcon30 />
      </p>

      <TonConnectButton />
    </div>
  );
};
