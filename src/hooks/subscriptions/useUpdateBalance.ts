import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetInfoResponseType} from '../data/queries/useGetInfo';

type UpdateBalance = {balance: number};

const prepareInfo = (
  cacheData: GetInfoResponseType,
  data: UpdateBalance,
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

export const useUpdateBalance = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onUpdateBalance = (data: UpdateBalance) => {
      console.log('onUpdateBalance fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_INFO],
        (cacheData: GetInfoResponseType) => {
          if (!cacheData) return cacheData;
          return prepareInfo(cacheData, data);
        },
      );
    };

    wsClient.on('updateBalance', onUpdateBalance);

    return () => {
      wsClient.off('updateBalance', onUpdateBalance);
    };
  }, []);
};
