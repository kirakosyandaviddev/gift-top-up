import {useEffect} from 'react';
import {wsClient} from '../libs/wsClient';

export const useSocketConnection = () => {
  useEffect(() => {
    wsClient.connect();

    return () => {
      wsClient.disconnect();
    };
  }, []);

  useEffect(() => {
    const onConnect = () => {
      console.log('socket connect::', wsClient.connected);
    };

    const onDisconnect = () => {
      console.log('socket disconnect::', wsClient.connected);
    };

    wsClient.on('connect', onConnect);
    wsClient.on('disconnect', onDisconnect);

    return () => {
      wsClient.off('connect', onConnect);
      wsClient.off('disconnect', onDisconnect);
    };
  }, []);
};
