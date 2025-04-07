import {useEffect, useRef} from 'react';
import classNames from 'classnames';
import {useNavigate} from 'react-router-dom';
import lottie from 'lottie-web';
import pako from 'pako';

import {useRandomGiftMutation} from '../../hooks/data/mutations/useRandomGiftMutation';
import {useGetConfigQuery} from '../../hooks/data/queries/useGetConfigQuery';
import {useBackButton} from '../../hooks/data/useBackButton';
import {TonIcon22} from '../../components/icons/TonIcon22';
import {ChevronRight22} from '../../components/icons/ChevronRight22';
import {ROUTES} from '../../consts/routes';

import s from './RoulettePage.module.css';

const loadTGS = async (tgsUrl: string, container: HTMLDivElement) => {
  const response = await fetch(tgsUrl);
  const buffer = await response.arrayBuffer();
  const decompressed = pako.ungzip(new Uint8Array(buffer), {to: 'string'});
  const animationData = JSON.parse(decompressed);

  lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData,
  });
};

export const RoulettePage = () => {
  useBackButton();
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const {data} = useGetConfigQuery();
  const {
    mutate: getRandomGift,
    data: getRandomGiftData,
    error,
    isPending,
  } = useRandomGiftMutation();
  console.log('data-----------------useRandomGiftMutation', getRandomGiftData);
  console.log('error-----------------useRandomGiftMutation', error);

  useEffect(() => {
    if (ref?.current && getRandomGiftData?.data?.gift?.animationUrl) {
      loadTGS(getRandomGiftData?.data?.gift?.animationUrl, ref?.current);
    }
  }, [getRandomGiftData?.data?.gift?.animationUrl]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h3 className={s.title}>Roulette</h3>
        <button
          className={classNames(s.balanceContainer, {
            [s.empty]: data?.data?.user ? !data?.data?.user?.balance : false,
          })}
          onClick={() => {
            navigate(ROUTES.BALANCE);
          }}
        >
          <TonIcon22 />
          <span className={s.balance}>{data?.data?.user?.balance || 0}</span>
          <span className={s.chevron}>
            <ChevronRight22 />
          </span>
        </button>
      </div>

      <div className={s.content}>
        <div ref={ref} style={{width: 320, height: 320}}></div>
      </div>

      <div className={s.btnContainer}>
        <button
          onClick={() => {
            getRandomGift();
            ref?.current?.firstChild &&
              ref.current.removeChild(ref.current.firstChild);
          }}
          disabled={isPending}
          className={s.btn}
        >
          <span>Swipe to Spin for 1</span>
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
