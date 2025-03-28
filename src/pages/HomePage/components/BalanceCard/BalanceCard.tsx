import {FC} from 'react';
import {Link} from 'react-router-dom';

import {ROUTES} from '../../../../consts/routes';
import {ArrowRight} from '../../../../components/icons/ArrowRight';

import s from './BalanceCard.module.css';

type PropsType = {
  balance: number;
};

export const BalanceCard: FC<PropsType> = ({balance}) => {
  return (
    <Link to={ROUTES.BALANCE} className={s.card}>
      <div className={s.info}>
        <div className={s.title}>Your Balance</div>
        <div className={s.body}>
          <span className={s.bodyText}>{balance}</span>

          <svg
            width="35"
            height="34"
            viewBox="0 0 35 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_305_46779)">
              <path
                d="M17.5758 4.63635H4.82331C3.62803 4.63635 2.8852 5.93513 3.49123 6.96538L16.2437 28.6445C16.8412 29.6604 18.3103 29.6604 18.9078 28.6445L31.6603 6.96538C32.2663 5.93513 31.5235 4.63635 30.3282 4.63635H17.5758ZM17.5758 4.63635V25.8566"
                stroke="white"
                strokeWidth="4.63636"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_305_46779">
                <rect
                  width="34"
                  height="34"
                  fill="white"
                  transform="translate(0.575745)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <ArrowRight />
    </Link>
  );
};
