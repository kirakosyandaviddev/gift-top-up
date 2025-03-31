import {useRandomGiftMutation} from '../../hooks/data/mutations/useRandomGiftMutation';
import {useBackButton} from '../../hooks/data/useBackButton';
import s from './RoulettePage.module.css';

export const RoulettePage = () => {
  useBackButton();
  const {
    mutate: getRandomGift,
    data,
    error,
    isPending,
  } = useRandomGiftMutation();
  console.log('data-----------------useRandomGiftMutation', data);
  console.log('error-----------------useRandomGiftMutation', error);

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <h3 className={s.title}>Roulette</h3>
      </div>

      <div className={s.btnContainer}>
        <button
          onClick={() => {
            getRandomGift();
          }}
          disabled={isPending}
          className={s.btn}
        >
          Swipe to Spin for 1
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.394381 3.4945C-0.302074 1.84633 1.03015 0.0594746 2.8154 0.247308L13.0321 1.32225C14.8173 1.51009 15.7485 3.53509 14.7243 5.00222L8.64283 13.7134C7.58122 15.2341 5.2515 14.989 4.52963 13.2807L0.394381 3.4945ZM7.82936 11.3482L13.0631 3.8513C13.2094 3.64171 13.0763 3.35243 12.8213 3.32559L8.71887 2.89396L7.82936 11.3482ZM2.60462 2.25065C2.34958 2.22381 2.15926 2.47908 2.25875 2.71453L5.81753 11.1365L6.70704 2.68228L2.60462 2.25065Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
