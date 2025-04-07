import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetConfigResponseType} from '../data/queries/useGetConfigQuery';

type UpdatePrice = {id: string; value: number};

const prepareCache = (
  cacheData: GetConfigResponseType,
  data: UpdatePrice,
): GetConfigResponseType => {
  return {
    ...cacheData,
    data: {
      ...cacheData.data,
      prices: cacheData.data.prices.map((p) =>
        p.id === data.id ? {...p, price: data.value} : p,
      ),
    },
  };
};

export const useUpdatePrice = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onUpdatePrice = (data: UpdatePrice) => {
      console.log('onUpdatePrice fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_CONFIG],
        (cacheData: GetConfigResponseType) => {
          if (!cacheData) return cacheData;
          return prepareCache(cacheData, data);
        },
      );
    };

    wsClient.on('updatePrice', onUpdatePrice);

    return () => {
      wsClient.off('updatePrice', onUpdatePrice);
    };
  }, []);
};
