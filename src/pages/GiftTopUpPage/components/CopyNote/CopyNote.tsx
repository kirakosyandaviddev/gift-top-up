import {CopyIcon32} from '../../../../components/icons/CopyIcon32';
import {useWebApp} from '../../../../hooks/useWebApp';

import s from './CopyNote.module.css';

export const CopyNote = () => {
  const WebApp = useWebApp();
  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.text}>
          Transfer your gifts to{' '}
          <button
            onClick={() => {
              WebApp.openTelegramLink(`https://t.me/m/CtWO8BXgMzlk`);
            }}
            className={s.link}
          >
            @GiftTopUp
          </button>
          <br />
          and get TON on your balance
        </div>
      </div>

      <button className={s.btn}>
        <CopyIcon32 />
      </button>
    </div>
  );
};
