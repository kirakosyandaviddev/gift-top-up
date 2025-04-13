import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../../hooks/useWebApp';
import {Gift} from '../../../etities/types/Gift';

export type GetFullGiftsResponseType = ResponseType<Gift[]>;

export const useGetFullGifts = () => {
  const WebApp = useWebApp();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.GET_FULL_GIFTS],
    queryFn: async () => {
      const response = await axiosClient<GetFullGiftsResponseType>({
        method: 'POST',
        url: ENDPOINTS.GET_FULL_GIFTS,
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
