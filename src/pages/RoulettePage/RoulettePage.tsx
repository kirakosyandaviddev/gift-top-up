import {useEffect, useRef, useState} from 'react';
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
import {MyGifts} from '../../components/MyGifts/MyGifts';

import titleOverlay from '/svg/roulettePage-title-overlay.svg';
import {SwipeButton} from './components/SwipeButton/SwipeButton';

import {Roulette} from './roulette';

import s from './RoulettePage.module.css';
import {TopUpButton} from './components/TopUpButton/TopUpButton';
import {BG} from './bg';
import {getHex} from '../../components/GiftCard/GiftCard';

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

  const [isRunning, setIsRunning] = useState(false);
  const [isLoopVisible, setIsLoopVisible] = useState(true);

  const userBalance = data?.data?.user?.balance || 0;
  // const wonGift = data?.data?.user?.gifts[0];
  const wonGift = getRandomGiftData?.data?.gift;

  useEffect(() => {
    if (ref?.current && wonGift?.animationUrl) {
      loadTGS(wonGift.animationUrl, ref?.current);
    }
  }, [wonGift?.animationUrl]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.titleContainer}>
          <h3 className={s.title}>Roulette</h3>
          <img src={titleOverlay} draggable={false} />
        </div>
        <button
          className={classNames(s.balanceContainer, {
            [s.empty]: data?.data?.user ? !userBalance : false,
          })}
          onClick={() => {
            navigate(ROUTES.BALANCE);
          }}
        >
          <TonIcon22 />
          <span className={s.balance}>{userBalance}</span>
          <span className={s.chevron}>
            <ChevronRight22 />
          </span>
        </button>
      </div>

      <div className={s.content}>
        {isLoopVisible && <Roulette isRunning={isRunning} />}
        {!isLoopVisible && (
          <div className={s.giftContainer}>
            <div ref={ref} />
            <span className={s.giftTitle}>
              {wonGift ? `${wonGift?.title} #${wonGift?.num}` : ''}
            </span>
          </div>
        )}
        {isLoopVisible && (
          <div
            className={classNames(s.backdrop, {
              [s.backdropAnimation]: isRunning,
            })}
          />
        )}
      </div>

      <div className={s.btnContainer}>
        {!!userBalance ? (
          <SwipeButton
            onSwipe={() => {
              setIsLoopVisible(true);
              setIsRunning(true);

              setTimeout(() => {
                setIsLoopVisible(false);
                setIsRunning(false);

                getRandomGift();
                ref?.current?.firstChild &&
                  ref.current.removeChild(ref.current.firstChild);
              }, 3000);
            }}
            disabled={isPending}
          />
        ) : (
          <TopUpButton
            onClick={() => {
              navigate(ROUTES.BALANCE);
            }}
          />
        )}
      </div>

      <BG style={{color: getHex(wonGift?.backdrop?.edgeColor || 0)}} />

      <MyGifts />
    </div>
  );
};
