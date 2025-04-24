import {memo} from 'react';
import {LottiePlayer} from '../../../../components/LottiePlayer/LottiePlayer';

import s from './GiftIcons.module.css';

export const GiftIcons = memo(
  ({animationUrl, title}: {animationUrl: string; title: string}) => {
    return (
      <div className={s.wrapper}>
        <div className={s.container}>
          {Array.from({length: 10}).map((_, i) => (
            <span key={i} className={s.item}>
              <LottiePlayer
                animationUrl={animationUrl}
                title={title}
                autoplay={false}
                loop={false}
                width={28}
                height={28}
              />
            </span>
          ))}
        </div>
      </div>
    );
  },
);
