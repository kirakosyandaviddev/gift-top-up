import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetFullGiftsResponseType} from '../data/queries/useGetFullGifts';
import {Gift} from '../../etities/types/Gift';

const prepareGifts = (
  cacheData: GetFullGiftsResponseType,
  data: Gift,
): GetFullGiftsResponseType => {
  return {
    ...cacheData,
    data: [...cacheData.data].map((gift) =>
      gift.id === data.id ? data : gift,
    ),
  };
};

export const useUpdateGift = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onUpdateGift = (data: Gift) => {
      console.log('onUpdateGift fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_GIFTS],
        (cacheData: GetFullGiftsResponseType) => {
          if (!cacheData) return cacheData;
          return prepareGifts(cacheData, data);
        },
      );
    };

    wsClient.on('updateGift', onUpdateGift);

    return () => {
      wsClient.off('updateGift', onUpdateGift);
    };
  }, []);
};
