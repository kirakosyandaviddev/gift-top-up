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

        {showDisabled ? (
          <text
            fill="white"
            fontSize="17"
            fontWeight="bold"
            textAnchor="middle"
          >
            <textPath
              href="#swipeCurve"
              startOffset="50%"
              dominantBaseline="middle"
            >
              Click{' '}
            </textPath>
          </text>
        ) : (
          <text fill="white" fontSize="17" fontWeight="600" textAnchor="middle">
            <textPath
              href="#swipeCurve"
              startOffset="50%"
              dominantBaseline="middle"
            >
              Swipe to Spin for {playAmount}
            </textPath>
          </text>
        )}

        {showDisabled && (
          <>
            <g
              clip-path="url(#clip0_2037_85589)"
              transform="translate(206, 14)"
            >
              <path
                d="M5.88252 0C3.18054 0 1 2.18054 1 4.86672C1 6.02019 1.40293 7.09466 2.08237 7.94003C2.23248 8.12173 2.41419 8.19282 2.58801 8.19282C3.02253 8.19282 3.38596 7.68719 3.02253 7.24476C2.4774 6.59691 2.16138 5.7674 2.16138 4.86672C2.16138 2.81258 3.82048 1.16138 5.88252 1.16138C7.92876 1.16138 9.57996 2.82048 9.57996 4.86672C9.57996 4.92992 9.57996 4.98522 9.57996 5.07213C9.58789 5.46715 9.86435 5.64098 10.1409 5.64098C10.4332 5.64098 10.7097 5.43554 10.7334 5.12744C10.7413 5.06423 10.7413 4.98522 10.7413 4.86672C10.7413 2.18054 8.56082 0 5.88252 0Z"
                fill="white"
              />
              <path
                d="M15.5605 21.529C19.6608 20.0357 21.0276 16.7176 19.4001 12.2459L18.7602 10.4919C18.1519 8.82493 16.9746 8.09806 16.0503 8.42992C15.8449 8.501 15.7738 8.6511 15.8449 8.84861L16.153 9.7019C16.2794 10.0495 16.1688 10.2865 15.9555 10.3656C15.7343 10.4445 15.4894 10.334 15.3709 9.9863L15.1576 9.41745C14.802 8.42992 13.925 8.01117 13.0718 8.32723C12.6768 8.4694 12.5662 8.69063 12.6847 9.01456L13.1034 10.1601C13.2298 10.5077 13.1113 10.7448 12.9059 10.8238C12.6847 10.9027 12.4398 10.7922 12.3134 10.4445L11.9262 9.39377C11.5233 8.27982 10.6859 7.98749 9.85631 8.28769C9.48497 8.42199 9.35067 8.6669 9.46917 8.98296L10.2751 11.1951C10.4014 11.5348 10.2829 11.7797 10.0775 11.8509C9.84838 11.9377 9.61139 11.8271 9.48497 11.4795L6.87779 4.32164C6.61707 3.61059 6.00085 3.31827 5.40042 3.53949C4.76837 3.7686 4.49186 4.38484 4.74467 5.09589L8.50531 15.4219C8.60013 15.6668 8.48163 15.8643 8.31573 15.9196C8.16558 15.9749 7.99968 15.9354 7.80217 15.7221L5.2029 12.9569C4.81578 12.5382 4.41285 12.4512 4.00203 12.6014C3.34628 12.8384 3.10927 13.4388 3.30678 13.984C3.37788 14.1894 3.48849 14.3553 3.5991 14.4975L6.86992 18.6137C9.46917 21.8845 12.5662 22.6192 15.5605 21.529Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2037_85589">
                <rect width="22" height="22" fill="white" />
              </clipPath>
            </defs>
          </>
        )}

        {!showDisabled && (
          <g transform="translate(250, 20) scale(0.9) rotate(6)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.394381 3.4945C-0.302074 1.84633 1.03015 0.0594746 2.8154 0.247308L13.0321 1.32225C14.8173 1.51009 15.7485 3.53509 14.7243 5.00222L8.64283 13.7134C7.58122 15.2341 5.2515 14.989 4.52963 13.2807L0.394381 3.4945ZM7.82936 11.3482L13.0631 3.8513C13.2094 3.64171 13.0763 3.35243 12.8213 3.32559L8.71887 2.89396L7.82936 11.3482ZM2.60462 2.25065C2.34958 2.22381 2.15926 2.47908 2.25875 2.71453L5.81753 11.1365L6.70704 2.68228L2.60462 2.25065Z"
              fill="white"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
