import {useRef, useEffect, useMemo} from 'react';
import gsap from 'gsap';

import {useGetPrices} from '../../../../hooks/data/queries/useGetPrices';

import s from './Roulette.module.css';

const ITEM_WIDTH = 204;

export const Roulette = ({
  isRunning,
  targetId,
  onRunEnd,
}: {
  isRunning: boolean;
  targetId?: string;
  onRunEnd: () => void;
}) => {
  const {data} = useGetPrices();
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  const dublicatedData = useMemo(() => {
    if (!data?.data) return [];
    return [...data.data, ...data.data, ...data.data];
  }, [data?.data]);

  useEffect(() => {
    const prices = data?.data || [];
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
          dublicatedData.map((price) => (
            <div className={s.slide} key={price.id} id={price.id}>
              <img
                src={price.photoUrl}
                width={180}
                height={180}
                draggable={false}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
