import {WarningIcon38} from '../../../../components/icons/WarningIcon38';
import s from './WarningNote.module.css';

export const WarningNote = () => {
  return (
    <div className={s.container}>
      <div className={s.icon}>
        <WarningIcon38 />
      </div>
      <div className={s.content}>
        <p className={s.title}>Warning!</p>
        <p className={s.text}>
          Make sure you select the right recipient before transferring your gift
        </p>
      </div>
    </div>
  );
};
