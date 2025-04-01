import {Link} from 'react-router-dom';

import {ROUTES} from '../../../../consts/routes';
import {ArrowRight} from '../../../../components/icons/ArrowRight';
import soonBadge from './soon-badge.png';

import s from './GiftboxesCard.module.css';

export const GiftboxesCard = () => {
  return (
    <Link to={ROUTES.GIFT_TOP_UP} className={s.card}>
      <img src={soonBadge} className={s.soonBadge} />

      <div className={s.body}>
        <div className={s.content}>
          <span className={s.title}>Gift Boxes</span>
          <span className={s.subtitle}>Next big win is just a spin away!</span>
        </div>

        <ArrowRight />
      </div>
    </Link>
  );
};
