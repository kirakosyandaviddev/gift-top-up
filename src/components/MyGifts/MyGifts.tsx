import {Link} from 'react-router-dom';

import {ArrowDown} from '../icons/ArrowDown';
import {ROUTES} from '../../consts/routes';

import bear from './my-gifts-bear.png';
import s from './MyGifts.module.css';

export const MyGifts = () => {
  return (
    <Link to={ROUTES.ROULETTE} className={s.container}>
      <div className={s.group}>
        <img src={bear} className={s.image} width={42} height={42} />
        <span className={s.text}>My Gifts</span>
      </div>
      <ArrowDown />
    </Link>
  );
};
