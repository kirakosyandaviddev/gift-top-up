import {useMutation} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {ENDPOINTS} from '../../../consts/endpoints';
import {ResponseType} from '../../../etities/types/ResponseType';
import {wsClient} from '../../../libs/wsClient';

type PickUpGiftResponseType = boolean;

export const usePickUpGiftMutation = () => {
  const {data, mutate, isSuccess, isPending, error} = useMutation({
    mutationKey: [QUERY_KEYS.PICK_UP_GIFT],
    mutationFn: async (id: string) => {
      // const response = await axiosClient<ResponseType<PickUpGiftResponseType>>({
      //   method: 'POST',
      //   url: ENDPOINTS.PICK_UP_GIFT,
      //   data: {initData: WebApp?.initData, id},
      // });
      // return response.data;

      return new Promise<ResponseType<PickUpGiftResponseType>>(
        (resolve, reject) => {
          wsClient.emit(
            ENDPOINTS.PICK_UP_GIFT,
            {id},
            (result: ResponseType<PickUpGiftResponseType>) => {
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
