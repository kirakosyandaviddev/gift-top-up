import {useGetRouletteGifts} from '../../../../hooks/data/queries/useGetRouletteGifts';

import s from './Roulette.module.css';

import {useRef, useEffect} from 'react';
import {motion, useAnimation} from 'framer-motion';

const ITEM_WIDTH = 204; // 180px + 24px margin

export const Roulette = ({
  isRunning,
  targetId,
  onRunEnd,
}: {
  isRunning: boolean;
  targetId?: string;
  onRunEnd: () => void;
}) => {
  const {data} = useGetRouletteGifts();
  const controls = useAnimation();
  const trackRef = useRef<HTMLDivElement>(null);

  console.log('=-----------------------', targetId);

  useEffect(() => {
    if (!isRunning || !data?.data?.length) return;

    const runAnimation = async () => {
      const endTargetId = data?.data[data?.data.length - 1]?.id;
      const targetEl = document.getElementById(targetId || endTargetId);
      const trackEl = trackRef.current;
      if (!targetEl || !trackEl) return;

      const containerWidth = trackEl.offsetParent?.clientWidth || 0;
      const targetOffset = targetEl.offsetLeft;

      const stopX = -targetOffset + containerWidth / 2 - ITEM_WIDTH / 2;

      // Accelerate, fast scroll, decelerate and stop
      await controls.start({
        x: [0, stopX],
        transition: {
          duration: 3,
          ease: 'easeInOut',
          times: [0, 0.4, 0.9, 1],
        },
      });

      onRunEnd();
    };

    runAnimation();
  }, [isRunning, targetId]);

  return (
    <div className={s.sliderContainer}>
      <motion.div
        ref={trackRef}
        className={s.sliderTrack}
        animate={controls}
        initial={{x: -60}}
      >
        {!!data?.data?.length &&
          data?.data.map((gift) => (
            <div className={s.slide} key={gift.id} id={gift.id}>
              <img
                src={gift.model.photoUrl}
                width={180}
                height={180}
                draggable={false}
              />
            </div>
          ))}
      </motion.div>
    </div>
  );
};
