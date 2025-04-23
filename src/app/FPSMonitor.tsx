import {useEffect, useRef} from 'react';
import Stats from 'stats.js';

export const FPSMonitor = () => {
  const statsRef = useRef<Stats | null>(null);

  useEffect(() => {
    statsRef.current = new Stats();
    statsRef.current.showPanel(0); // 0 = FPS
    const statsEl = statsRef.current.dom;
    statsEl.style.position = 'fixed';
    statsEl.style.top = 'auto';
    statsEl.style.bottom = '24px';
    statsEl.style.left = '24px';
    document.body.appendChild(statsEl);

    const animate = () => {
      statsRef.current?.begin();
      statsRef.current?.end();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      if (statsRef.current) {
        document.body.removeChild(statsRef.current.dom);
      }
    };
  }, []);

  return null;
};
