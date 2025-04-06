import {useMutation} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {User} from '../../../etities/types/User';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../useWebApp';
import {useUpdateCache} from '../../utils/useUpdateCache';

type PickUpGiftResponseType = {
  user: User;
};

export const usePickUpGiftMutation = () => {
  const WebApp = useWebApp();
  const updateCache = useUpdateCache();

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
