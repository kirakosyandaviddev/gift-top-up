import {useRef, useEffect, useMemo} from 'react';
import gsap from 'gsap';

import {Price} from '../../../../etities/types/Price';

import s from './Roulette.module.css';

const ITEM_WIDTH = 152; // 128+24

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
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  const dublicatedData = useMemo(() => {
    if (!pricesData) return [];
    return [...pricesData, ...pricesData, ...pricesData];
  }, [pricesData]);

  useEffect(() => {
    const prices = pricesData || [];
    if (!isRunning || !prices.length) return;

    const runAnimation = () => {
      const trackEl = trackRef.current;
      if (!trackEl) return;

      const original = prices;

      const middleIndexOffset = original.length;
      const target = targetId
        ? original.find((g) => g.id === targetId)
        : original[original.length - 1];
      if (!target) return;

      const targetIndex = original.findIndex((g) => g.id === target.id);
      const duplicatedTargetIndex = middleIndexOffset + targetIndex;

      const finalOffset = duplicatedTargetIndex * ITEM_WIDTH;
      const containerWidth =
        trackEl.offsetParent?.clientWidth || ITEM_WIDTH * 3;
      const stopX = -finalOffset + containerWidth / 2 - ITEM_WIDTH / 2;

      // Clear any existing tween
      scrollTween.current?.kill();

      const timeline = gsap.timeline({onComplete: onRunEnd});

      // 1️⃣ Ease-in start
      timeline.to(trackEl, {
        x: `-=${ITEM_WIDTH * original.length * 0.5}`,
        duration: 1,
        ease: 'power1.in',
      });

      // 2️⃣ Fast linear scroll
      timeline.to(trackEl, {
        x: `-=${ITEM_WIDTH * original.length * 2}`,
        duration: 1.2,
        ease: 'none',
      });

      // 3️⃣ Ease out to target
      timeline.to(trackEl, {
        x: stopX,
        duration: 1.2,
        ease: 'power3.out',
      });

      scrollTween.current = timeline;
    };

    runAnimation();
  }, [isRunning, targetId]);

  return (
    <div className={s.sliderContainer}>
      <div ref={trackRef} className={s.sliderTrack}>
        {!!dublicatedData.length &&
          dublicatedData.map((price, i) => (
            <div
              className={s.slide}
              key={`${price.id}-${i}`}
              id={i <= Number(pricesData?.length) ? price.id : ''}
            >
              <img
                src={price.photoUrl}
                width={128}
                height={128}
                draggable={false}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
