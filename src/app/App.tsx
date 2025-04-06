import {QueryClientProvider} from '@tanstack/react-query';
import {TonConnectUIProvider} from '@tonconnect/ui-react';

import {useSocketConnection} from '../hooks/useSocketConnection';
import {queryClient} from '../libs/queryClient';
import {Router} from './Router';

function App() {
  useSocketConnection();

  return (
    <div>
      <TonConnectUIProvider
        manifestUrl={`https://gift-top-up.vercel.app/tonconnect-manifest.json`}
      >
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </TonConnectUIProvider>
    </div>
  );
}

export default App;
