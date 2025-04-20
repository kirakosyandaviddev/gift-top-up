import {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';

import {Arrows} from './Arrows';

import s from './SwipeButton.module.css';

type PropsType = {
  isRunning: boolean;
  showDisabled: boolean;
  onSwipe: () => void;
  playAmount?: number;
};
export const SwipeButton = ({
  onSwipe,
  isRunning,
  showDisabled,
  playAmount = 1,
}: PropsType) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const ref = useRef(null);
  const [startX, setStartX] = useState<number | null>(null);
  const isTouch = useRef(false); // to prevent overlap
  const [bgX, setBgX] = useState<number | null>(null);

  const handleStart = (x: number, touch = false) => {
    setStartX(x);
    isTouch.current = touch;
  };

  const handleEnd = (x: number) => {
    if (startX === null) return;
    if (startX - x > 100) {
      setIsSwiped(true);
    }
    setStartX(null);
    console.log(bgX);
    setBgX(0);
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

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX !== null) {
      const deltaX = e.touches[0].clientX - startX;
      setBgX(Math.min(deltaX, 0)); // limit translateX
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX !== null && !isTouch.current) {
      const deltaX = e.clientX - startX;
      setBgX(Math.min(deltaX, 0));
    }
  };

  useEffect(() => {
    if (isSwiped && !isRunning) {
      onSwipe();
      setBgX(-500);
      setIsSwiped(false);
    }
  }, [isSwiped]);

  useEffect(() => {
    if (!showDisabled) {
      setBgX(0);
    }
  }, [showDisabled]);

  return (
    <div
      role="button"
      className={classNames(s.wrapper, {[s.disabled]: showDisabled})}
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onMouseMove={handleMouseMove}
    >
      {!showDisabled && <Arrows className={s.arrowsWrapper} />}

      <svg
        width="361"
        height="68"
        viewBox="0 0 361 68"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="swipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00b0f5" />
            <stop offset="25%" stopColor="#7140cc" />
            <stop offset="50%" stopColor="#ff00a2" />
            <stop offset="100%" stopColor="#e35e3e" />
          </linearGradient>

          <path
            id="swipeCurve"
            d="M25 43C73.4363 31.3593 125.823 25 180.5 25C235.177 25 287.564 31.3593 336 43"
          />

          <path
            id="tonIcon"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.394381 3.4945C-0.302074 1.84633 1.03015 0.0594746 2.8154 0.247308L13.0321 1.32225C14.8173 1.51009 15.7485 3.53509 14.7243 5.00222L8.64283 13.7134C7.58122 15.2341 5.2515 14.989 4.52963 13.2807L0.394381 3.4945ZM7.82936 11.3482L13.0631 3.8513C13.2094 3.64171 13.0763 3.35243 12.8213 3.32559L8.71887 2.89396L7.82936 11.3482ZM2.60462 2.25065C2.34958 2.22381 2.15926 2.47908 2.25875 2.71453L5.81753 11.1365L6.70704 2.68228L2.60462 2.25065Z"
            fill="white"
          />
        </defs>

        {!showDisabled && (
          <use
            href="#swipeCurve"
            stroke="url(#swipeGradient)"
            strokeWidth="50"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {showDisabled && (
          <use
            href="#swipeCurve"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="50"
            strokeLinecap="round"
            fill="none"
          />
        )}

        <text fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">
          <textPath
            href="#swipeCurve"
            startOffset="50%"
            dominantBaseline="middle"
          >
            Swipe to Spin for {playAmount}
            <use
              href="#tonIcon"
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
            />
          </textPath>
        </text>

        <g transform="translate(250, 20) scale(0.9) rotate(6)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.394381 3.4945C-0.302074 1.84633 1.03015 0.0594746 2.8154 0.247308L13.0321 1.32225C14.8173 1.51009 15.7485 3.53509 14.7243 5.00222L8.64283 13.7134C7.58122 15.2341 5.2515 14.989 4.52963 13.2807L0.394381 3.4945ZM7.82936 11.3482L13.0631 3.8513C13.2094 3.64171 13.0763 3.35243 12.8213 3.32559L8.71887 2.89396L7.82936 11.3482ZM2.60462 2.25065C2.34958 2.22381 2.15926 2.47908 2.25875 2.71453L5.81753 11.1365L6.70704 2.68228L2.60462 2.25065Z"
            fill="white"
          />
        </g>
      </svg>
    </div>
  );
};
