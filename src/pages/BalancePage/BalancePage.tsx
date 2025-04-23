import {BalanceInfo} from './components/BalanceInfo/BalanceInfo';
import {TopUpWith} from './components/TopUpWith/TopUpWith';
import {Transactions} from './components/Transactions/Transactions';
import {useGetFullTransactions} from '../../hooks/data/queries/useGetFullTransactions';
import {useGetInfo} from '../../hooks/data/queries/useGetInfo';
import {useNewTransaction} from '../../hooks/subscriptions/useNewTransaction';

import titleOverlay from '/svg/balancePage-title-overlay.svg';

import s from './BalancePage.module.css';

export const BalancePage = () => {
  useNewTransaction();

  const {data} = useGetInfo();
  const {data: transactionsData} = useGetFullTransactions();

  const transactions = transactionsData?.data
    ? [...transactionsData.data].filter(
        ({type}) => !['pick_up_gift', 'deposit_partner'].includes(type),
      )
    : [];

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <h3 className={s.title}>Balance</h3>
        <img src={titleOverlay} draggable={false} />
      </div>

      <BalanceInfo balance={data?.data?.user?.balance} />
      <TopUpWith />
      <Transactions transactions={transactions} />
    </div>
  );
};
