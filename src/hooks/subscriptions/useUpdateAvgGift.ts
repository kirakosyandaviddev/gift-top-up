import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetConfigResponseType} from '../data/queries/useGetConfigQuery';

type UpdateAvgGift = {id: string; value: number};

const prepareCache = (
  cacheData: GetConfigResponseType,
  data: UpdateAvgGift,
): GetConfigResponseType => {
  return {
    ...cacheData,
    data: {
      ...cacheData.data,
      user: {
        ...cacheData.data.user,
        gifts: cacheData.data.user.gifts.map((gift) =>
          gift.id === data.id ? {...gift, avg: data.value} : gift,
        ),
      },
      nfts: cacheData.data.nfts.map((gift) =>
        gift.id === data.id ? {...gift, avg: data.value} : gift,
      ),
    },
  };
};

export const useUpdateAvgGift = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onUpdateAvgGift = (data: UpdateAvgGift) => {
      console.log('onUpdateAvgGift fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_CONFIG],
        (cacheData: GetConfigResponseType) => {
          if (!cacheData) return cacheData;
          return prepareCache(cacheData, data);
        },
      );
    };

    wsClient.on('updateAvgGift', onUpdateAvgGift);

    return () => {
      wsClient.off('updateAvgGift', onUpdateAvgGift);
    };
  }, []);
};
