import {useMutation, useQueryClient} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../useWebApp';
import {Gift} from '../../../etities/types/Gift';
import {GetPricesResponseType} from '../queries/useGetPrices';

type RandomGiftResponseType = {
  gifts: string[];
  gift: Gift;
  index: number;
};

const preparePrices = (
  cacheData: GetPricesResponseType,
  data: string[], // array of ids in desired order
): GetPricesResponseType => {
  const idOrderMap = new Map(data.map((id, index) => [id, index]));

  return {
    ...cacheData,
    data: [...cacheData.data].sort(
      (a, b) =>
        (idOrderMap.get(a.id) ?? Infinity) - (idOrderMap.get(b.id) ?? Infinity),
    ),
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
        [QUERY_KEYS.GET_PRICES],
        (cacheData: GetPricesResponseType) => {
          if (!cacheData) return cacheData;
          return preparePrices(cacheData, d.data.gifts);
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
