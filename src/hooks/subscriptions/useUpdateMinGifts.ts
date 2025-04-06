import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetConfigResponseType} from '../data/queries/useGetConfigQuery';

type UpdateMinGifts = {title: string; value: number};

const prepareCache = (
  cacheData: GetConfigResponseType,
  data: UpdateMinGifts,
): GetConfigResponseType => {
  return {
    ...cacheData,
    data: {
      ...cacheData.data,
      prices: cacheData.data.prices.map((gift) =>
        gift.title === data.title ? {...gift, min: data.value} : gift,
      ),
    },
  };
};

export const useUpdateMinGifts = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onUpdateMinGifts = (data: UpdateMinGifts) => {
      console.log('onUpdateMinGifts fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_CONFIG],
        (cacheData: GetConfigResponseType) => {
          if (!cacheData) return cacheData;
          return prepareCache(cacheData, data);
        },
      );
    };

    wsClient.on('updateMinGifts', onUpdateMinGifts);

    return () => {
      wsClient.off('updateMinGifts', onUpdateMinGifts);
    };
  }, []);
};
