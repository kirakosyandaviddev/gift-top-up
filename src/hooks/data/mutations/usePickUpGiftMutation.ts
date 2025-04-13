import {useMutation, useQueryClient} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../useWebApp';
import {GetFullGiftsResponseType} from '../queries/useGetFullGifts';

type PickUpGiftResponseType = boolean;

const prepareGifts = (
  cacheData: GetFullGiftsResponseType,
  giftId: string,
): GetFullGiftsResponseType => {
  return {
    ...cacheData,
    data: [...cacheData.data].filter((gift) => gift.id !== giftId),
  };
};

export const usePickUpGiftMutation = () => {
  const WebApp = useWebApp();
  const queryClient = useQueryClient();

  const {data, mutate, isSuccess, isPending, error} = useMutation({
    mutationKey: [QUERY_KEYS.PICK_UP_GIFT],
    mutationFn: async (id: string) => {
      const response = await axiosClient<ResponseType<PickUpGiftResponseType>>({
        method: 'POST',
        url: ENDPOINTS.PICK_UP_GIFT,
        data: {initData: WebApp?.initData, id},
      });
      return response.data;
    },
    onSuccess: (d, v) => {
      console.log('pickUpGift onSuccess', d);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_GIFTS],
        (cacheData: GetFullGiftsResponseType) => {
          if (!cacheData) return cacheData;
          return prepareGifts(cacheData, v);
        },
      );
    },
  });

  return {
    data,
    error,
    mutate,
    isSuccess,
    isPending,
  };
};
