import {LottiePlayer} from '../../LottiePlayer/LottiePlayer';

import s from './Patterns.module.css';

export const Patterns = ({
  animationUrl,
  title,
}: {
  animationUrl: string;
  title: string;
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {Array.from({length: 12}).map((_, i) => (
          <span key={i} className={s.item}>
            <LottiePlayer
              animationUrl={animationUrl}
              title={title}
              autoplay={false}
              loop={false}
              width={25}
              height={25}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
