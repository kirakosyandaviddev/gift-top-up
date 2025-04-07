import {useEffect} from 'react';
import {THEME, useTonConnectUI} from '@tonconnect/ui-react';

import {useWebApp} from './useWebApp';

export const useWalletTheme = () => {
  const WebApp = useWebApp();
  const [_, setTonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const onThemeChanged = () => {
      setTonConnectUI({
        uiPreferences: {
          theme: WebApp.colorScheme === 'dark' ? THEME.DARK : THEME.LIGHT,
        },
      });
    };
    WebApp.onEvent('themeChanged', onThemeChanged);

    return () => {
      WebApp.offEvent('themeChanged', onThemeChanged);
    };
  }, []);
};
