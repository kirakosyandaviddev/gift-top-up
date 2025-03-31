import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {User} from '../../../etities/types/User';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../../hooks/useWebApp';
import {Gift} from '../../../etities/types/Gift';

export type GetConfigResponseType = {
  user: User;
  nfts: Gift[];
  address: string;
  play: number;
};

export const useGetConfigQuery = () => {
  const WebApp = useWebApp();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.GET_CONFIG],
    queryFn: () =>
      axiosClient<ResponseType<GetConfigResponseType>>({
        method: 'POST',
        url: ENDPOINTS.GET_CONFIG,
        data: {initData: WebApp?.initData},
      }),
    staleTime: 3 * 60 * 1000,
  });

  return {
    data: data?.data,
  };
};
