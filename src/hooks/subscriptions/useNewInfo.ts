import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetInfoResponseType} from '../data/queries/useGetInfo';
import {User} from '../../etities/types/User';

type NewInfo = {user: User; address: string; play: number};

const prepareInfo = (
  cacheData: GetInfoResponseType,
  data: NewInfo,
): GetInfoResponseType => {
  return {
    ...cacheData,
    data: {
      ...cacheData.data,
      ...data,
    },
  };
};

export const useNewInfo = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onNewInfo = (data: NewInfo) => {
      console.log('onNewInfo fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_INFO],
        (cacheData: GetInfoResponseType) => {
          if (!cacheData) return cacheData;
          return prepareInfo(cacheData, data);
        },
      );
    };

    wsClient.on('newInfo', onNewInfo);

    return () => {
      wsClient.off('newInfo', onNewInfo);
    };
  }, []);
};
