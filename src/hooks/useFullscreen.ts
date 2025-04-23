import {useEffect} from 'react';
import {useWebApp} from './useWebApp';

export const useFullscreen = () => {
  const WebApp = useWebApp();

  useEffect(() => {
    if (!WebApp?.isFullscreen) {
      WebApp?.requestFullscreen();
    }
    if (!WebApp?.isExpanded) {
      WebApp?.expand();
    }
    if (WebApp?.isVerticalSwipesEnabled) {
      WebApp?.disableVerticalSwipes();
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) window.scrollTo(0, 0);
    };

    const onResize = () => {
      document.body.style.height = window.visualViewport?.height + 'px';
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize);
    }
    // This will ensure user never overscroll the page
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);
};
