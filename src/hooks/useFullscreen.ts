import {useEffect} from 'react';
import {useWebApp} from './useWebApp';

export const useFullscreen = () => {
  const WebApp = useWebApp();

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => e.preventDefault();

    document.addEventListener('touchmove', preventDefault, {passive: false});

    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (!WebApp?.isFullscreen) {
        WebApp?.requestFullscreen();
      }
      if (!WebApp?.isExpanded) {
        WebApp?.expand();
      }
      if (WebApp?.isVerticalSwipesEnabled) {
        WebApp?.disableVerticalSwipes();
      }
    }, 100);
  }, []);
};
