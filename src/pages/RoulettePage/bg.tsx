import {memo} from 'react';
import s from './RoulettePage.module.css';

export const BG = memo(({style}: any) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={s.bg}
    style={{
      ...style,
    }}
    viewBox="0 0 393 852"
    preserveAspectRatio="xMidYMid meet"
  >
    <g filter="url(#filter0_f_203_5174)">
      <circle cx="196.5" cy="425.5" r="317.475" fill="currentColor" />
    </g>
    <defs>
      <filter
        id="filter0_f_203_5174"
        x="-351.081"
        y="-122.081"
        width="1095.16"
        height="1095.16"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="115.053"
          result="effect1_foregroundBlur_203_5174"
        />
      </filter>
    </defs>
  </svg>
));
