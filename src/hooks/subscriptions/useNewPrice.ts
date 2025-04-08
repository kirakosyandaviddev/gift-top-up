import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetConfigResponseType} from '../data/queries/useGetConfigQuery';
import {Price} from '../../etities/types/Price';

const prepareCache = (
  cacheData: GetConfigResponseType,
  data: Price,
): GetConfigResponseType => {
  return {
    ...cacheData,
    data: {
      ...cacheData.data,
      prices: [...cacheData.data.prices, data],
    },
  };
};

export const useNewPrice = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onNewPrice = (data: Price) => {
      console.log('onNewPrice fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_CONFIG],
        (cacheData: GetConfigResponseType) => {
          if (!cacheData) return cacheData;
          return prepareCache(cacheData, data);
        },
      );
    };

    wsClient.on('newPrice', onNewPrice);

    return () => {
      wsClient.off('newPrice', onNewPrice);
    };
  }, []);
};
