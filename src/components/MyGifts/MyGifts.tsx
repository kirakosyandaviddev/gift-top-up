import {Link} from 'react-router-dom';

import {ArrowDown} from '../icons/ArrowDown';
import {ROUTES} from '../../consts/routes';

import myGifts from '/svg/myGifts.svg';

import s from './MyGifts.module.css';

export const MyGifts = () => {
  return (
    <Link to={ROUTES.GIFTS} className={s.container}>
      <div className={s.group}>
        <img
          src={myGifts}
          className={s.image}
          width={42}
          height={42}
          draggable={false}
        />
        <span className={s.text}>My Gifts</span>
      </div>
      <ArrowDown />
    </Link>
  );
};
