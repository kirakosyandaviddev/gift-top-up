import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';

export const useGetConfigQuery = () => {
  const {data} = useQuery({
    queryKey: [QUERY_KEYS.GET_CONFIG],
    queryFn: () =>
      axiosClient({
        method: 'POST',
        url: ENDPOINTS.GET_CONFIG,
        // @ts-ignore
        data: {initData: window.Telegram?.WebApp?.initData},
      }),
  });

  return {
    data: data?.data,
  };
};
