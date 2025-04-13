import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../../hooks/useWebApp';
import {Transaction} from '../../../etities/types/Transaction';

export type GetFullTransactionsResponseType = ResponseType<Transaction[]>;

export const useGetFullTransactions = () => {
  const WebApp = useWebApp();

  const {data} = useQuery({
    queryKey: [QUERY_KEYS.GET_FULL_TRANSACTIONS],
    queryFn: async () => {
      const response = await axiosClient<GetFullTransactionsResponseType>({
        method: 'POST',
        url: ENDPOINTS.GET_FULL_TRANSACTIONS,
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
