import classNames from 'classnames';

import bag from './svg/bag.svg';
import cat from './svg/cat.svg';
import goldRing from './svg/goldRing.svg';
import ring from './svg/ring.svg';
import sigar from './svg/sigar.svg';
import socks from './svg/socks.svg';
import cap from './svg/cap.svg';
import parfume from './svg/parfume.svg';
import ringTG from './svg/ringTG.svg';
import helmet from './svg/helmet.svg';
import apple from './svg/apple.svg';
import frog from './svg/frog.svg';
import hat from './svg/hat.svg';

import s from './roulette.module.css';

const slides = [
  ring,
  sigar,
  goldRing,
  bag,
  cat,
  socks,
  cap,
  parfume,
  ringTG,
  helmet,
  apple,
  frog,
  hat,
];

export const Roulette = ({isRunning}: {isRunning: boolean}) => {
  return (
    <div className={s.sliderContainer}>
      <div className={classNames(s.sliderTrack, {[s.animate]: isRunning})}>
        {slides.map((src, i) => (
          <div className={s.slide} key={`slide-item-${i}`}>
            <img src={src} width={180} height={180} />
          </div>
        ))}
      </div>
    </div>
  );
};
