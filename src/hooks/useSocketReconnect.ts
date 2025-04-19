import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../libs/wsClient';
import {QUERY_KEYS} from '../consts/queryKeys';

export const useSocketReconnect = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onReconnect = () => {
      console.log('socket re_connect::', wsClient.connected);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FULL_TRANSACTIONS],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FULL_GIFTS],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FULL_GIFTS_PROFILE],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRICES],
      });
    };

    wsClient.on('reconnect', onReconnect);

    return () => {
      wsClient.off('reconnect', onReconnect);
    };
  }, []);
};
