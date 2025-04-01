import {FC} from 'react';
import {ChainIcon22} from '../../../../components/icons/ChainIcon22';
import {TonIcon30} from '../../../../components/icons/TonIcon30';

import s from './BalanceInfo.module.css';

type PropsType = {
  balance?: number;
  address?: string;
};

const shortenText = (text: string, startLength = 4, endLength = 4) => {
  if (text.length <= startLength + endLength) return text;
  return `${text.slice(0, startLength)}...${text.slice(-endLength)}`;
};

export const BalanceInfo: FC<PropsType> = ({balance = 0, address = ''}) => {
  const shorAddress = shortenText(address, 4, 4);

  return (
    <div className={s.container}>
      <p className={s.title}>
        <span>{balance}</span>
        <TonIcon30 />
      </p>

      {!!address ? (
        <button className={s.walletButton}>
          <ChainIcon22 />
          <span>{shorAddress}</span>
        </button>
      ) : (
        <button className={s.walletButton}>
          <ChainIcon22 />
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
};
