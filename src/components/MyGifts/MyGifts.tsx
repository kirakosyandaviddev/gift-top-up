import {memo, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

import {ArrowDown} from '../icons/ArrowDown';
import {ROUTES} from '../../consts/routes';
import {useSwipeUp} from '../../hooks/useSwipeUp';

import bear from './bear.svg';
import stone from './stone.svg';

import {Star} from './Star';
import s from './MyGifts.module.css';

export const MyGifts = memo(() => {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    navigate(ROUTES.GIFTS);
  };

  useSwipeUp(buttonRef, handleClick);

  return (
    <button ref={buttonRef} onClick={handleClick} className={s.container}>
      <div className={s.group}>
        <div className={s.imgGroup}>
          <img
            src={bear}
            className={s.bear}
            width={25}
            height={25}
            draggable={false}
          />
          <img
            src={stone}
            className={s.stone}
            width={25}
            height={25}
            draggable={false}
          />

          <div className={s.stars}>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </div>

        <span className={s.text}>My Gifts</span>
      </div>
      <ArrowDown />
    </button>
  );
});
