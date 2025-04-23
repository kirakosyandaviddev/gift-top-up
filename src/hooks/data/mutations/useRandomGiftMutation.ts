import {useMutation, useQueryClient} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {ResponseType} from '../../../etities/types/ResponseType';
import {Gift} from '../../../etities/types/Gift';
import {GetPricesResponseType} from '../queries/useGetPrices';
import {wsClient} from '../../../libs/wsClient';
import {ENDPOINTS} from '../../../consts/endpoints';

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
  const queryClient = useQueryClient();

  const {data, mutate, isSuccess, isPending, error, reset} = useMutation({
    mutationKey: [QUERY_KEYS.RANDOM_GIFT],
    mutationFn: async () => {
      console.log('useRandomGiftMutation=============useRandomGiftMutation');
      // const response = await axiosClient<ResponseType<RandomGiftResponseType>>({
      //   method: 'POST',
      //   url: ENDPOINTS.RANDOM_GIFT,
      //   data: {initData: WebApp?.initData},
      // });
      // return response.data;

      return new Promise<ResponseType<RandomGiftResponseType>>(
        (resolve, reject) => {
          wsClient.emit(
            ENDPOINTS.RANDOM_GIFT,
            {},
            (result: ResponseType<RandomGiftResponseType>) => {
              if (result.error) {
                console.error(result.error);
                reject(result.error);
              } else {
                resolve(result);
              }
            },
          );
        },
      );
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
    reset,
  };
};
