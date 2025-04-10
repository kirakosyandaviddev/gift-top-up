import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {Transaction} from '../../etities/types/Transaction';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetConfigResponseType} from '../data/queries/useGetConfigQuery';

type NewTransaction = {balance: number; transaction: Transaction};

const prepareCache = (
  cacheData: GetConfigResponseType,
  data: NewTransaction,
): GetConfigResponseType => {
  return {
    ...cacheData,
    data: {
      ...cacheData.data,
      user: {
        ...cacheData.data.user,
        balance: data.balance,
        historyTransaction: [
          ...cacheData.data.user.historyTransaction,
          data.transaction,
        ],
      },
    },
  };
};

export const useNewTransaction = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onNewTransaction = (data: NewTransaction) => {
      console.log('onNewTransaction fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_CONFIG],
        (cacheData: GetConfigResponseType) => {
          if (!cacheData) return cacheData;

          return prepareCache(cacheData, data);
        },
      );
    };

    wsClient.on('newTransaction', onNewTransaction);

    return () => {
      wsClient.off('newTransaction', onNewTransaction);
    };
  }, []);
};
