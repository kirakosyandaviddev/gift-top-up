import {Link} from 'react-router-dom';

import {ROUTES} from '../../../../consts/routes';
import {ArrowRight} from '../../../../components/icons/ArrowRight';
import rouletteCard from './roulette-card.png';

import s from './RouletteCard.module.css';

export const RouletteCard = () => {
  return (
    <Link to={ROUTES.ROULETTE} className={s.card}>
      <img src={rouletteCard} className={s.rouletteCard} />

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
