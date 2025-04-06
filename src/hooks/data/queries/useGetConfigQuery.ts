import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {User} from '../../../etities/types/User';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../../hooks/useWebApp';
import {Gift} from '../../../etities/types/Gift';

export type GetConfig = {
  user: User;
  nfts: Gift[];
  prices: Gift[];
  address: string;
  play: number;
};

export type GetConfigResponseType = ResponseType<GetConfig>;

export const useGetConfigQuery = () => {
  const WebApp = useWebApp();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.GET_CONFIG],
    queryFn: async () => {
      const response = await axiosClient<GetConfigResponseType>({
        method: 'POST',
        url: ENDPOINTS.GET_CONFIG,
        data: {initData: WebApp?.initData},
      });
      return response.data;
    },
    staleTime: 3 * 60 * 1000,
  });

  return {
    data: data,
  };
};
