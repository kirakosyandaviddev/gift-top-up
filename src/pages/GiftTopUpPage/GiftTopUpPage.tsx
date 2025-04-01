import {useBackButton} from '../../hooks/data/useBackButton';
import {Gifts} from './components/Gifts/Gifts';

import s from './GiftTopUpPage.module.css';

export const GiftTopUpPage = () => {
  useBackButton();

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <h3 className={s.title}>Gift Top Up</h3>
      </div>

      <Gifts />
    </div>
  );
};
