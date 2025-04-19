import {useMutation} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {ENDPOINTS} from '../../../consts/endpoints';
import {ResponseType} from '../../../etities/types/ResponseType';
import {wsClient} from '../../../libs/wsClient';

type SwapGiftToTonResponseType = {
  balance: number;
};

export const useSwapGiftToTonMutation = () => {
  const {data, mutate, isSuccess, isPending, error} = useMutation({
    mutationKey: [QUERY_KEYS.SWAP_GIFT_TO_TON],
    mutationFn: async (id: string) => {
      // const response = await axiosClient<
      //   ResponseType<SwapGiftToTonResponseType>
      // >({
      //   method: 'POST',
      //   url: ENDPOINTS.SWAP_GIFT_TO_TON,
      //   data: {initData: WebApp?.initData, id},
      // });
      // return response.data;

      return new Promise<ResponseType<SwapGiftToTonResponseType>>(
        (resolve, reject) => {
          wsClient.emit(
            ENDPOINTS.SWAP_GIFT_TO_TON,
            {id},
            (result: ResponseType<SwapGiftToTonResponseType>) => {
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
  });

  return {
    data,
    error,
    mutate,
    isSuccess,
    isPending,
  };
};
