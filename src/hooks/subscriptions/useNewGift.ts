import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetFullGiftsResponseType} from '../data/queries/useGetFullGifts';
import {Gift} from '../../etities/types/Gift';

type NewGift = {gift: Gift};

const prepareGifts = (
  cacheData: GetFullGiftsResponseType,
  data: NewGift,
): GetFullGiftsResponseType => {
  return {
    ...cacheData,
    data: [data.gift, ...cacheData.data],
  };
};

export const useNewGift = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onNewGift = (data: NewGift) => {
      console.log('onNewGift fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_GIFTS],
        (cacheData: GetFullGiftsResponseType) => {
          if (!cacheData) return cacheData;
          return prepareGifts(cacheData, data);
        },
      );
    };

    wsClient.on('newGift', onNewGift);

    return () => {
      wsClient.off('newGift', onNewGift);
    };
  }, []);
};
