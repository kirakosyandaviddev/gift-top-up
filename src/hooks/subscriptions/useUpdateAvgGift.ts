import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetFullGiftsProfileResponseType} from '../data/queries/useGetFullGiftsProfile';
import {GetFullGiftsResponseType} from '../data/queries/useGetFullGifts';

type UpdateAvgGift = {id: string; value: number};

const prepareGiftsProfile = (
  cacheData: GetFullGiftsProfileResponseType,
  data: UpdateAvgGift,
): GetFullGiftsProfileResponseType => {
  return {
    ...cacheData,
    data: [...cacheData.data].map((gift) =>
      gift.id === data.id ? {...gift, avg: data.value} : gift,
    ),
  };
};

const prepareGifts = (
  cacheData: GetFullGiftsResponseType,
  data: UpdateAvgGift,
): GetFullGiftsResponseType => {
  return {
    ...cacheData,
    data: [...cacheData.data].map((gift) =>
      gift.id === data.id ? {...gift, avg: data.value} : gift,
    ),
  };
};

export const useUpdateAvgGift = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onUpdateAvgGift = (data: UpdateAvgGift) => {
      console.log('onUpdateAvgGift fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_GIFTS_PROFILE],
        (cacheData: GetFullGiftsProfileResponseType) => {
          if (!cacheData) return cacheData;
          return prepareGiftsProfile(cacheData, data);
        },
      );

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_GIFTS],
        (cacheData: GetFullGiftsResponseType) => {
          if (!cacheData) return cacheData;
          return prepareGifts(cacheData, data);
        },
      );
    };

    wsClient.on('updateAvgGift', onUpdateAvgGift);

    return () => {
      wsClient.off('updateAvgGift', onUpdateAvgGift);
    };
  }, []);
};
