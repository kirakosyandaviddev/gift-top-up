import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {User} from '../../../etities/types/User';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../../hooks/useWebApp';

export type GetInfo = {
  user: User;
  address: string;
  play: number;
};

export type GetInfoResponseType = ResponseType<GetInfo>;

export const useGetInfo = () => {
  const WebApp = useWebApp();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.GET_INFO],
    queryFn: async () => {
      const response = await axiosClient<GetInfoResponseType>({
        method: 'POST',
        url: ENDPOINTS.GET_INFO,
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
