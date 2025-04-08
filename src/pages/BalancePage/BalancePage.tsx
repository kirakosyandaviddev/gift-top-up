import {useBackButton} from '../../hooks/data/useBackButton';
import {useGetConfigQuery} from '../../hooks/data/queries/useGetConfigQuery';

import {BalanceInfo} from './components/BalanceInfo/BalanceInfo';
import {TopUpWith} from './components/TopUpWith/TopUpWith';
import {Transactions} from './components/Transactions/Transactions';

import s from './BalancePage.module.css';

export const BalancePage = () => {
  useBackButton();
  const {data} = useGetConfigQuery();

  const transactions = data?.data?.user?.historyTransaction
    ? [...data?.data?.user?.historyTransaction]
        .filter(({type}) => !['pick_up_gift', 'deposit_partner'].includes(type))
        .reverse()
    : [];

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <h3 className={s.title}>Balance</h3>
      </div>

      <BalanceInfo balance={data?.data?.user?.balance} />
      <TopUpWith />
      <Transactions transactions={transactions} />
    </div>
  );
};
