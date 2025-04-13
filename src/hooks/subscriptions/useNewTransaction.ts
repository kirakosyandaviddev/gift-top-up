import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {Transaction} from '../../etities/types/Transaction';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetFullTransactionsResponseType} from '../data/queries/useGetFullTransactions';
import {GetInfoResponseType} from '../data/queries/useGetInfo';

type NewTransaction = {balance: number; transaction: Transaction};

const prepareInfo = (
  cacheData: GetInfoResponseType,
  data: NewTransaction,
): GetInfoResponseType => {
  return {
    ...cacheData,
    data: {
      ...cacheData.data,
      user: {
        ...cacheData.data.user,
        balance: data.balance,
      },
    },
  };
};

const prepareTransactions = (
  cacheData: GetFullTransactionsResponseType,
  data: NewTransaction,
): GetFullTransactionsResponseType => {
  return {
    ...cacheData,
    data: [data.transaction, ...cacheData.data],
  };
};

export const useNewTransaction = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onNewTransaction = (data: NewTransaction) => {
      console.log('onNewTransaction fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_INFO],
        (cacheData: GetInfoResponseType) => {
          if (!cacheData) return cacheData;

          return prepareInfo(cacheData, data);
        },
      );

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_TRANSACTIONS],
        (cacheData: GetFullTransactionsResponseType) => {
          if (!cacheData) return cacheData;
          return prepareTransactions(cacheData, data);
        },
      );
    };

    wsClient.on('newTransaction', onNewTransaction);

    return () => {
      wsClient.off('newTransaction', onNewTransaction);
    };
  }, []);
};
