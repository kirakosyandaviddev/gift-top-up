import {useEffect, useRef} from 'react';
import lottie from 'lottie-web';
import Pako from 'pako';

import s from './GiftIcons.module.css';

export const GiftIcons = ({animationUrl}: {animationUrl: string}) => {
  const refs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const run = async () => {
      const response = await fetch(animationUrl);
      const buffer = await response.arrayBuffer();
      const decompressed = Pako.ungzip(new Uint8Array(buffer), {to: 'string'});
      const animationData = JSON.parse(decompressed);

      refs.current.forEach((el, i) => {
        if (el) {
          lottie.loadAnimation({
            name: `gift-${i}`,
            container: el,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData,
          });
        }
      });
    };

    run();

    return () => {
      refs.current.forEach((el, i) => {
        if (el) {
          lottie.destroy(`gift-${i}`);
        }
      });
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {Array.from({length: 10}).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) {
                refs.current[i] = el;
              }
            }}
            className={s.item}
          />
        ))}
      </div>
    </div>
  );
};
