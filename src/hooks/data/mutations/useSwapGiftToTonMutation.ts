import {useMutation} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {User} from '../../../etities/types/User';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../useWebApp';
import {useUpdateCache} from '../../utils/useUpdateCache';

type SwapGiftToTonResponseType = {
  user: User;
};

export const useSwapGiftToTonMutation = () => {
  const WebApp = useWebApp();
  const updateCache = useUpdateCache();

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
    onSuccess: (d) => {
      updateCache(d.data.user);
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
