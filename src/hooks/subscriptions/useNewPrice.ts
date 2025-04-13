import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {Price} from '../../etities/types/Price';
import {GetPricesResponseType} from '../data/queries/useGetPrices';

const prepareCache = (
  cacheData: GetPricesResponseType,
  data: Price,
): GetPricesResponseType => {
  return {
    ...cacheData,
    data: [...cacheData.data, data],
  };
};

export const useNewPrice = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onNewPrice = (data: Price) => {
      console.log('onNewPrice fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_PRICES],
        (cacheData: GetPricesResponseType) => {
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
