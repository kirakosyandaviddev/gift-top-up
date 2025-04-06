import {useMutation} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {User} from '../../../etities/types/User';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../useWebApp';
import {WinType} from '../../../etities/types/WinType';
import {Gift} from '../../../etities/types/Gift';
import {useUpdateCache} from '../../utils/useUpdateCache';

type RandomGiftResponseType = {
  winType: WinType;
  gift: Gift;
  user: User;
};

export const useRandomGiftMutation = () => {
  const WebApp = useWebApp();
  const updateCache = useUpdateCache();

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
