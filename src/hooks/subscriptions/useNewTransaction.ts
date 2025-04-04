import {useEffect} from 'react';

import {wsClient} from '../../libs/wsClient';
import {Transaction} from '../../etities/types/Transaction';

type NewTransaction = {balance: number; transaction: Transaction};

export const useNewTransaction = () => {
  useEffect(() => {
    const onNewTransaction = (data: NewTransaction) => {
      console.log('socket newTransaction::', data);
    };

    wsClient.on('newTransaction', onNewTransaction);

    return () => {
      wsClient.off('newTransaction', onNewTransaction);
    };
  }, []);
};
