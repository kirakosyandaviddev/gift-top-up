import {Link} from 'react-router-dom';

import {ROUTES} from '../../../../consts/routes';
import {ArrowRight} from '../../../../components/icons/ArrowRight';

import soonBadge from './soon.svg';
import boxes from './boxes.svg';
import shadow from './shadow.svg';

import s from './GiftboxesCard.module.css';

export const GiftboxesCard = () => {
  return (
    <Link to={ROUTES.GIFT_TOP_UP} className={s.card}>
      <img src={soonBadge} className={s.soonBadge} draggable={false} />
      <img src={boxes} className={s.boxes} draggable={false} />
      <img src={shadow} className={s.shadow} draggable={false} />

      <div className={s.body}>
        <div className={s.content}>
          <span className={s.title}>Boxes</span>
          <span className={s.subtitle}>Next big win is just a spin away!</span>
        </div>

        <ArrowRight />
      </div>
    </Link>
  );
};
