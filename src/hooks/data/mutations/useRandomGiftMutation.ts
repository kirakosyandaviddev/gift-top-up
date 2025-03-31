import {useMutation, useQueryClient} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {User} from '../../../etities/types/User';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../useWebApp';
import {WinType} from '../../../etities/types/WinType';
import {Gift} from '../../../etities/types/Gift';

type RandomGiftResponseType = {
  winType: WinType;
  gift: Gift;
  user: User;
};

export const useRandomGiftMutation = () => {
  const queryClient = useQueryClient();
  const WebApp = useWebApp();

  const {data, mutate, isSuccess, isPending, error} = useMutation({
    mutationKey: [QUERY_KEYS.RANDOM_GIFT],
    mutationFn: () =>
      axiosClient<ResponseType<RandomGiftResponseType>>({
        method: 'POST',
        url: ENDPOINTS.RANDOM_GIFT,
        data: {initData: WebApp?.initData},
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
