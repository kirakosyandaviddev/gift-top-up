import {useRef, useEffect, memo} from 'react';
import gsap from 'gsap';

import {Price} from '../../../../etities/types/Price';

import ellipse from './ellipse.svg';
import s from './BackdropAnimation.module.css';

export const BackdropAnimation = memo(
  ({
    isRunning,
    duration,
    pricesData,
  }: {
    isRunning: boolean;
    duration: number;
    pricesData?: Price[];
  }) => {
    const wheelRef = useRef(null);

    useEffect(() => {
      const prices = pricesData || [];
      if (!isRunning || !prices.length) return;

      const runAnimation = () => {
        gsap.to(wheelRef.current, {
          rotate: -360,
          duration: duration,
          ease: 'power4.out',
        });
      };

      runAnimation();
    }, [isRunning]);

    return (
      <div className={s.backdropContainer}>
        <div className={s.backdropWrapper}>
          <div
            ref={wheelRef}
            className={s.backdropTrack}
            style={{
              width: `${1282}px`,
              height: `${1282}px`,
              backgroundImage: `url(${ellipse})`,
            }}
          ></div>
        </div>
      </div>
    );
  },
);
