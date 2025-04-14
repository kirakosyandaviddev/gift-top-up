import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../../hooks/useWebApp';
import {Price} from '../../../etities/types/Price';

export type GetPricesResponseType = ResponseType<Price[]>;

export const useGetPrices = () => {
  const WebApp = useWebApp();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.GET_PRICES],
    queryFn: async () => {
      const response = await axiosClient<GetPricesResponseType>({
        method: 'POST',
        url: ENDPOINTS.GET_PRICES,
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
