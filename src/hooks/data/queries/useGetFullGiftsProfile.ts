import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../../hooks/useWebApp';
import {Gift} from '../../../etities/types/Gift';

export type GetFullGiftsProfileResponseType = ResponseType<Gift[]>;

export const useGetFullGiftsProfile = () => {
  const WebApp = useWebApp();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.GET_FULL_GIFTS_PROFILE],
    queryFn: async () => {
      const response = await axiosClient<GetFullGiftsProfileResponseType>({
        method: 'POST',
        url: ENDPOINTS.GET_FULL_GIFTS_PROFILE,
        data: {initData: WebApp?.initData},
      });
      return response.data;
    },
    enabled: false,
  });

  return {
    data: data,
  };
};
