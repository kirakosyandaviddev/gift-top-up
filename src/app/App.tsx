import {QueryClientProvider} from '@tanstack/react-query';
import {TonConnectUIProvider} from '@tonconnect/ui-react';

import {useSocketConnection} from '../hooks/useSocketConnection';
import {queryClient} from '../libs/queryClient';
import {Router} from './Router';
import {useNewTransaction} from '../hooks/subscriptions/useNewTransaction';

function App() {
  useSocketConnection();
  useNewTransaction();

  return (
    <div>
      <TonConnectUIProvider
        manifestUrl={`https://192.168.5.62:5173/tonconnect-manifest.json`}
      >
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </TonConnectUIProvider>
    </div>
  );
}

export default App;
