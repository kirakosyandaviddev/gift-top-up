import {useRef, useEffect, memo} from 'react';
import gsap from 'gsap';

import {Price} from '../../../../etities/types/Price';

import s from './Roulette.module.css';

export const getRandomSpinDuration = () => {
  const random = Math.random();
  if (random < 0.2) return 4; // 0.0 - 0.2 → 20%
  if (random < 0.4) return 6; // 0.2 - 0.4 → 20%
  return 5; // 0.4 - 1.0 → 60%
};

export const Roulette = memo(
  ({
    isRunning,
    duration,
    targetIndex = 0,
    pricesData,
    onRunEnd,
  }: {
    isRunning: boolean;
    duration: number;
    targetIndex?: number;
    pricesData?: Price[];
    onRunEnd: () => void;
  }) => {
    console.log('Roulette------------------');
    const wheelRef = useRef(null);

    useEffect(() => {
      const prices = pricesData || [];
      if (!isRunning || !prices.length || !wheelRef.current) return;
      console.log('targetIndex------------------', targetIndex);

      const totalItems = prices.length;
      const anglePerItem = 360 / totalItems;

      let anim: gsap.core.Tween;

      if (!targetIndex) {
        // PHASE 1: Infinite spin until targetIndex becomes available
        anim = gsap.to(wheelRef.current, {
          rotate: -360,
          duration: duration,
          ease: 'linear',
          repeat: -1, // infinite
        });
      } else {
        // PHASE 2: Stop on the target index
        const targetAngle = targetIndex * anglePerItem;
        const spins = 5;
        const finalRotation = -(spins * 360 + targetAngle + 90);

        // Kill the infinite animation before starting the stop animation
        gsap.killTweensOf(wheelRef.current);

        anim = gsap.to(wheelRef.current, {
          rotate: finalRotation,
          duration: duration,
          ease: 'power4.out',
          onComplete: onRunEnd,
        });
      }

      return () => {
        anim?.kill();
      };
    }, [isRunning, targetIndex]);

    // Idle State
    useEffect(() => {
      if (isRunning || !pricesData?.length) return;
      console.log('idle');

      const anim = gsap.to(wheelRef.current, {
        rotate: -360,
        duration: 15 * pricesData.length,
        ease: 'power4.out',
      });

      return () => {
        anim.kill();
      };
    }, [isRunning, pricesData]);

    const itemSize = 180;
    const spacing = 24;
    const totalArcLengthPerItem = itemSize + spacing;
    const numItems = pricesData?.length || 0;
    const anglePerItem = (2 * Math.PI) / numItems;
    const radius = Math.ceil(totalArcLengthPerItem / anglePerItem);
    const wheelSize = radius * 2;

    return (
      <div className={s.sliderContainer}>
        <div
          ref={wheelRef}
          className={s.sliderTrack}
          style={{
            width: `${wheelSize}px`,
            height: `${wheelSize}px`,
          }}
        >
          {!!pricesData?.length &&
            pricesData.map((price, index) => {
              const angle = (index / pricesData.length) * 2 * Math.PI;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);

              const deg = (angle * 180) / Math.PI + 90;
              const normalizedDeg = (deg + 360) % 360;
              const isTop = normalizedDeg >= 345 || normalizedDeg <= 15;

              return (
                <div
                  className={s.slide}
                  style={{
                    width: `${itemSize}px`,
                    height: `${itemSize}px`,
                    left: `${x + radius}px`,
                    top: `${y + radius}px`,
                    transform: `translate(-50%, -50%) rotate(${isTop ? 0 : deg}deg)`, // No rotation at the top
                  }}
                  key={price.id}
                  id={price.id}
                >
                  <img
                    src={price.photoUrl}
                    width={128}
                    height={128}
                    draggable={false}
                  />
                  {/* <LottiePlayer
                  animationUrl={price.animationUrl}
                  title={price.title}
                  autoplay={false}
                  loop={false}
                  width={180}
                  height={180}
                /> */}
                </div>
              );
            })}
        </div>
      </div>
    );
  },
);
