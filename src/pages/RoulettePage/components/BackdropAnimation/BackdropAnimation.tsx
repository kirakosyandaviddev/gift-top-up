import {useRef, useEffect} from 'react';
import gsap from 'gsap';

import {Price} from '../../../../etities/types/Price';

import ellipse from './ellipse.svg';
import s from './BackdropAnimation.module.css';

export const BackdropAnimation = ({
  isRunning,
  targetId,
  pricesData,
}: {
  isRunning: boolean;
  targetId?: string;
  pricesData?: Price[];
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
      console.log('finalRotation', finalRotation);

      gsap.to(wheelRef.current, {
        rotate: -360,
        duration: 8,
        ease: 'power3.out',
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
    <div className={s.backdropContainer}>
      <div className={s.backdropWrapper}>
        <div
          ref={wheelRef}
          className={s.backdropTrack}
          style={{
            width: `${wheelSize}px`,
            height: `${wheelSize}px`,
            backgroundImage: `url(${ellipse})`,
          }}
        ></div>
      </div>
    </div>
  );
};
