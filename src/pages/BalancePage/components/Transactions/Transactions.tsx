import {Tabs} from '../../../../components/Tabs/Tabs';
import {TransactionCard} from '../TransactionCard/TransactionCard';

import s from './Transactions.module.css';

export type Transaction = {
  id: string;
};

const deposits: Transaction[] = [
  {id: '1'},
  {id: '2'},
  {id: '3'},
  {id: '4'},
  {id: '5'},
];

const incoming: Transaction[] = [];

const upcoming: Transaction[] = [];

export const Transactions = () => {
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
        {!!deposits.length ? (
          <div className={s.container}>
            {deposits.map((deposit) => (
              <TransactionCard key={deposit.id} transaction={deposit} />
            ))}
          </div>
        ) : (
          emptyStateMarkup
        )}
      </Tabs.Panel>

      <Tabs.Panel tab="incoming">
        {!!incoming.length ? (
          <div className={s.container}>
            {incoming.map((deposit) => (
              <TransactionCard key={deposit.id} transaction={deposit} />
            ))}
          </div>
        ) : (
          emptyStateMarkup
        )}
      </Tabs.Panel>

      <Tabs.Panel tab="outgoing">
        {!!upcoming.length ? (
          <div className={s.container}>
            {upcoming.map((deposit) => (
              <TransactionCard key={deposit.id} transaction={deposit} />
            ))}
          </div>
        ) : (
          emptyStateMarkup
        )}
      </Tabs.Panel>
    </Tabs>
  );
};
