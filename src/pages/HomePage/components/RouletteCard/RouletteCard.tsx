import {Link} from 'react-router-dom';

import {ROUTES} from '../../../../consts/routes';
import {ArrowRight} from '../../../../components/icons/ArrowRight';

import img from '/svg/roulette-icon.svg';

import s from './RouletteCard.module.css';

export const RouletteCard = () => {
  return (
    <Link to={ROUTES.ROULETTE} className={s.card}>
      <img src={img} className={s.rouletteCard} draggable={false} />

      <div className={s.body}>
        <div className={s.content}>
          <span className={s.title}>Roulette</span>
          <span className={s.subtitle}>Next big win is just a spin away!</span>
        </div>

        <ArrowRight />
      </div>
    </Link>
  );
};
