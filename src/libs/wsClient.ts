import {io} from 'socket.io-client';

export const wsClient = io('https://mypixe.io', {
  path: '/435822/ws',
  autoConnect: false,
  auth: {
    initData: window.Telegram.WebApp.initData,
  },
  transports: ['websocket'],
});
