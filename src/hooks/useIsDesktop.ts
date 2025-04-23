import {useWebApp} from './useWebApp';

export const useIsDesktop = (): boolean => {
  const WebApp = useWebApp();

  return ['macos', 'tdesktop', 'web'].includes(WebApp.platform);
};
