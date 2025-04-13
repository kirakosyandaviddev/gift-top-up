import {useMutation, useQueryClient} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../useWebApp';
import {GetInfoResponseType} from '../queries/useGetInfo';
import {GetFullGiftsResponseType} from '../queries/useGetFullGifts';

type SwapGiftToTonResponseType = {
  balance: number;
};

const prepareInfo = (
  cacheData: GetInfoResponseType,
  data: SwapGiftToTonResponseType,
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

const prepareGifts = (
  cacheData: GetFullGiftsResponseType,
  giftId: string,
): GetFullGiftsResponseType => {
  return {
    ...cacheData,
    data: [...cacheData.data].filter((gift) => gift.id !== giftId),
  };
};

export const useSwapGiftToTonMutation = () => {
  const WebApp = useWebApp();
  const queryClient = useQueryClient();

  const {data, mutate, isSuccess, isPending, error} = useMutation({
    mutationKey: [QUERY_KEYS.SWAP_GIFT_TO_TON],
    mutationFn: async (id: string) => {
      const response = await axiosClient<
        ResponseType<SwapGiftToTonResponseType>
      >({
        method: 'POST',
        url: ENDPOINTS.SWAP_GIFT_TO_TON,
        data: {initData: WebApp?.initData, id},
      });
      return response.data;
    },
    onSuccess: (d, v) => {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_INFO],
        (cacheData: GetInfoResponseType) => {
          if (!cacheData) return cacheData;
          return prepareInfo(cacheData, d.data);
        },
      );

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
