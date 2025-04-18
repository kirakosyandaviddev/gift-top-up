import {useRef, useEffect} from 'react';
import gsap from 'gsap';
import lottie from 'lottie-web';

import {Price} from '../../../../etities/types/Price';

import s from './Roulette.module.css';

export const LottieSticker = ({
  animationUrl,
  width = 128,
  height = 128,
}: {
  animationUrl: string;
  width?: number;
  height?: number;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: animationUrl,
    });

    return () => anim.destroy();
  }, [animationUrl]);

  return <div style={{width, height}} ref={containerRef} />;
};

export const Roulette = ({
  isRunning,
  targetId,
  pricesData,
  onRunEnd,
}: {
  isRunning: boolean;
  targetId?: string;
  pricesData?: Price[];
  onRunEnd: () => void;
}) => {
  const wheelRef = useRef(null);

  useEffect(() => {
    const prices = pricesData || [];
    if (!isRunning || !prices.length) return;

    const runAnimation = () => {
      const targetIndex = prices.findIndex((item) => item.id === targetId);

      const totalItems = prices.length;
      const anglePerItem = 360 / totalItems;
      const targetAngle = targetIndex * anglePerItem;

      // const offset = anglePerItem / 2;

      const spins = 3; // full 360° spins
      const finalRotation = -(spins * 360 + targetAngle + 90);

      gsap.to(wheelRef.current, {
        rotate: finalRotation,
        duration: 8,
        ease: 'power3.out',
        onComplete: onRunEnd,
      });
    };

    runAnimation();
  }, [isRunning, targetId]);

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
              </div>
            );
          })}
      </div>
    </div>
  );
};
