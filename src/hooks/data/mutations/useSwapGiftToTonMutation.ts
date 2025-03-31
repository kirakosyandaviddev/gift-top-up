import {useMutation, useQueryClient} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {User} from '../../../etities/types/User';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../useWebApp';

type SwapGiftToTonResponseType = {
  user: User;
};

export const useSwapGiftToTonMutation = () => {
  const WebApp = useWebApp();
  const queryClient = useQueryClient();

  const {data, mutate, isSuccess, isPending, error} = useMutation({
    mutationKey: [QUERY_KEYS.SWAP_GIFT_TO_TON],
    mutationFn: (id: string) =>
      axiosClient<ResponseType<SwapGiftToTonResponseType>>({
        method: 'POST',
        url: ENDPOINTS.SWAP_GIFT_TO_TON,
        data: {initData: WebApp?.initData, id},
      }),
    onSuccess: (d) => {
      // TODO: improve optimistic updates
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_CONFIG]});
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
