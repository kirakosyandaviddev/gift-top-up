import {FC} from 'react';

import {Tabs} from '../../../../components/Tabs/Tabs';
import {Transaction} from '../../../../etities/types/Transaction';
import {TransactionCard} from '../TransactionCard/TransactionCard';

import s from './Transactions.module.css';

type PropsType = {
  transactions?: Transaction[];
};

export const Transactions: FC<PropsType> = ({transactions = []}) => {
  const incoming: Transaction[] =
    transactions.filter((t) =>
      ['swap_gift', 'deposit_ton', 'deposit_gift'].includes(t.type),
    ) || [];

  const outgoing: Transaction[] =
    transactions.filter((t) => ['spin'].includes(t.type)) || [];

  const emptyStateMarkup = (
    <div className={s.emptyContainer}>
      <p className={s.emptyText}>No transactions yet...</p>
    </div>
  );

  return (
    <Tabs defaultTab="all">
      <Tabs.List>
        <Tabs.Tab tab="all">All</Tabs.Tab>
        <Tabs.Tab tab="incoming">Incoming</Tabs.Tab>
        <Tabs.Tab tab="outgoing">Outgoing</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel tab="all">
        {!!transactions.length ? (
          <div className={s.container}>
            {transactions.map((transaction, i) => (
              <TransactionCard
                key={`transaction.id-${i}`}
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          emptyStateMarkup
        )}
      </Tabs.Panel>

      <Tabs.Panel tab="incoming">
        {!!incoming.length ? (
          <div className={s.container}>
            {incoming.map((transaction, i) => (
              <TransactionCard
                key={`transaction-id-${i}`}
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          emptyStateMarkup
        )}
      </Tabs.Panel>

      <Tabs.Panel tab="outgoing">
        {!!outgoing.length ? (
          <div className={s.container}>
            {outgoing.map((transaction, i) => (
              <TransactionCard
                key={`transaction-id-${i}`}
                transaction={transaction}
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
