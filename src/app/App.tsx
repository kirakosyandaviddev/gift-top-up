import {QueryClientProvider} from '@tanstack/react-query';
import {THEME, TonConnectUIProvider} from '@tonconnect/ui-react';

import {useSocketConnection} from '../hooks/useSocketConnection';
import {queryClient} from '../libs/queryClient';
import {useWebApp} from '../hooks/useWebApp';
import {Router} from './Router';

function App() {
  useSocketConnection();
  const WebApp = useWebApp();

  return (
    <div className="main-wrapper">
      <TonConnectUIProvider
        manifestUrl={`https://gift-top-up.vercel.app/tonconnect-manifest.json`}
        uiPreferences={{
          theme: WebApp.colorScheme === 'dark' ? THEME.DARK : THEME.LIGHT,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </TonConnectUIProvider>
    </div>
  );
}

export default App;
