import {useQuery} from '@tanstack/react-query';

import {QUERY_KEYS} from '../../../consts/queryKeys';
import {axiosClient} from '../../../libs/axiosClient';
import {ENDPOINTS} from '../../../consts/endpoints';
import {UserType} from '../../../etities/types/UserType';
import {ResponseType} from '../../../etities/types/ResponseType';
import {useWebApp} from '../../../hooks/useWebApp';
import {GiftType} from '../../../etities/types/GiftType';

type GetConfigResponseType = {
  user: UserType;
  nfts: GiftType[];
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
  });

  return {
    data: data?.data,
  };
};
