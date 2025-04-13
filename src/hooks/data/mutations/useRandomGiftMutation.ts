import {useMutation, useQueryClient} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../useWebApp';
import {WinType} from '../../../etities/types/WinType';
import {Gift} from '../../../etities/types/Gift';
import {Transaction} from '../../../etities/types/Transaction';
import {GetInfoResponseType} from '../queries/useGetInfo';
import {GetFullGiftsResponseType} from '../queries/useGetFullGifts';
import {GetFullTransactionsResponseType} from '../queries/useGetFullTransactions';

type RandomGiftResponseType = {
  winGift: Gift;
  winType: WinType;
  balance: number;
  transaction: Transaction;
};

const prepareInfo = (
  cacheData: GetInfoResponseType,
  data: RandomGiftResponseType,
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
  data: RandomGiftResponseType,
): GetFullGiftsResponseType => {
  return {
    ...cacheData,
    data: [...cacheData.data, data.winGift],
  };
};

const prepareTransactions = (
  cacheData: GetFullTransactionsResponseType,
  data: RandomGiftResponseType,
): GetFullTransactionsResponseType => {
  return {
    ...cacheData,
    data: [data.transaction, ...cacheData.data],
  };
};

export const useRandomGiftMutation = () => {
  const WebApp = useWebApp();
  const queryClient = useQueryClient();

  const {data, mutate, isSuccess, isPending, error} = useMutation({
    mutationKey: [QUERY_KEYS.RANDOM_GIFT],
    mutationFn: async () => {
      const response = await axiosClient<ResponseType<RandomGiftResponseType>>({
        method: 'POST',
        url: ENDPOINTS.RANDOM_GIFT,
        data: {initData: WebApp?.initData},
      });
      return response.data;
    },
    onSuccess: (d) => {
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
          return prepareGifts(cacheData, d.data);
        },
      );

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_TRANSACTIONS],
        (cacheData: GetFullTransactionsResponseType) => {
          if (!cacheData) return cacheData;
          return prepareTransactions(cacheData, d.data);
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
