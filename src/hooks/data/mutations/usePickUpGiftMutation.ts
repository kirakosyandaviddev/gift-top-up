import {useMutation, useQueryClient} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {User} from '../../../etities/types/User';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../useWebApp';

type PickUpGiftResponseType = {
  user: User;
};

export const usePickUpGiftMutation = () => {
  const queryClient = useQueryClient();
  const WebApp = useWebApp();

  const {data, mutate, isSuccess, isPending, error} = useMutation({
    mutationKey: [QUERY_KEYS.PICK_UP_GIFT],
    mutationFn: (id: string) =>
      axiosClient<ResponseType<PickUpGiftResponseType>>({
        method: 'POST',
        url: ENDPOINTS.PICK_UP_GIFT,
        data: {initData: WebApp?.initData, id},
      }),
    onSuccess: () => {
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
