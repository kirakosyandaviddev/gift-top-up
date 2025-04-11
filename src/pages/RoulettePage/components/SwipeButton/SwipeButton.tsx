import {useState, useRef, useEffect} from 'react';

import background from './svg/background.svg';

import {Arrows} from './Arrows';
import s from './SwipeButton.module.css';

export const SwipeButton = ({onSwipe}: any) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const ref = useRef(null);
  const [startX, setStartX] = useState<number | null>(null);
  const isTouch = useRef(false); // to prevent overlap

  const handleStart = (x: number, touch = false) => {
    setStartX(x);
    isTouch.current = touch;
  };

  const handleEnd = (x: number) => {
    if (startX === null) return;
    if (startX - x > 160) {
      setIsSwiped(true);
    }
    setStartX(null);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX, true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    handleEnd(e.changedTouches[0].clientX);
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, false);
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isTouch.current) {
      handleEnd(e.clientX);
    }
  };

  useEffect(() => {
    if (isSwiped) {
      onSwipe();
      setIsSwiped(false);
    }
  }, [isSwiped]);

  return (
    <div
      role="button"
      className={s.wrapper}
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={s.content}>
        <span>Swipe to Spin for 1</span>
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.394381 3.4945C-0.302074 1.84633 1.03015 0.0594746 2.8154 0.247308L13.0321 1.32225C14.8173 1.51009 15.7485 3.53509 14.7243 5.00222L8.64283 13.7134C7.58122 15.2341 5.2515 14.989 4.52963 13.2807L0.394381 3.4945ZM7.82936 11.3482L13.0631 3.8513C13.2094 3.64171 13.0763 3.35243 12.8213 3.32559L8.71887 2.89396L7.82936 11.3482ZM2.60462 2.25065C2.34958 2.22381 2.15926 2.47908 2.25875 2.71453L5.81753 11.1365L6.70704 2.68228L2.60462 2.25065Z"
            fill="white"
          />
        </svg>
      </div>

      <Arrows className={s.arrowsWrapper} />
      <img src={background} className={s.background} draggable={false} />
    </div>
  );
};
