import {useBackButton} from '../../hooks/data/useBackButton';
import {useGetConfigQuery} from '../../hooks/data/queries/useGetConfigQuery';

import {BalanceInfo} from './components/BalanceInfo/BalanceInfo';
import {TopUpWith} from './components/TopUpWith/TopUpWith';
import {Transactions} from './components/Transactions/Transactions';

import s from './BalancePage.module.css';

export const BalancePage = () => {
  useBackButton();
  const {data} = useGetConfigQuery();

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <h3 className={s.title}>Balance</h3>
      </div>

      <BalanceInfo
        balance={data?.data?.user?.balance}
        address={data?.data?.address}
      />
      <TopUpWith />
      <Transactions transactions={data?.data?.user?.historyTransaction} />
    </div>
  );
};
