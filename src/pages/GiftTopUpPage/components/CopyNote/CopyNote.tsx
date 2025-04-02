import {CopyIcon32} from '../../../../components/icons/CopyIcon32';

import s from './CopyNote.module.css';

export const CopyNote = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.text}>
          Transfer your gifts to{' '}
          <a href="/" className={s.title}>
            @GiftTopUp
          </a>{' '}
          and get TON on your balance
        </div>
      </div>

      <button className={s.btn}>
        <CopyIcon32 />
      </button>
    </div>
  );
};
