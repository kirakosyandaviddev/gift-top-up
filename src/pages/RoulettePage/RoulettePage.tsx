import {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {useNavigate} from 'react-router-dom';
import lottie from 'lottie-web';
import pako from 'pako';

import {useRandomGiftMutation} from '../../hooks/data/mutations/useRandomGiftMutation';
import {useBackButton} from '../../hooks/data/useBackButton';
import {TonIcon22} from '../../components/icons/TonIcon22';
import {ChevronRight22} from '../../components/icons/ChevronRight22';
import {ROUTES} from '../../consts/routes';
import {MyGifts} from '../../components/MyGifts/MyGifts';
import {useGetInfo} from '../../hooks/data/queries/useGetInfo';

import titleOverlay from '/svg/roulettePage-title-overlay.svg';
import {SwipeButton} from './components/SwipeButton/SwipeButton';

import s from './RoulettePage.module.css';

import {TopUpButton} from './components/TopUpButton/TopUpButton';
import {BG} from './bg';
import {getHex} from '../../components/GiftCard/GiftCard';
import {Confetti} from './components/Confetti/Confetti';
import {Roulette} from './components/Roulette/Roulette';
import {Gift} from '../../etities/types/Gift';

import circle from './svg/circle.svg';

const loadTGS = async (
  tgsUrl: string,
  name: string,
  container: HTMLDivElement,
) => {
  const response = await fetch(tgsUrl);
  const buffer = await response.arrayBuffer();
  const decompressed = pako.ungzip(new Uint8Array(buffer), {to: 'string'});
  const animationData = JSON.parse(decompressed);

  lottie.loadAnimation({
    name: name,
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
  const {data} = useGetInfo();
  const {
    mutate: getRandomGift,
    data: getRandomGiftData,
    error: getRandomGiftError,
  } = useRandomGiftMutation();
  console.log('data-----------------useRandomGiftMutation', getRandomGiftData);
  console.log(
    'error-----------------useRandomGiftMutation',
    getRandomGiftError,
  );

  const [isRunning, setIsRunning] = useState(false);
  const [isRouletteVisible, setIsRouletteVisible] = useState(true);
  const [winGift, setWinGift] = useState<null | Gift>(null);

  const userBalance = data?.data?.user?.balance || 0;

  useEffect(() => {
    if (ref?.current && winGift) {
      loadTGS(winGift.model.animationUrl, winGift.title, ref?.current);
    }
  }, [winGift]);

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
        {isRouletteVisible && (
          <Roulette
            isRunning={isRunning}
            targetId={getRandomGiftData?.data?.winGift?.id}
            onRunEnd={() => {
              console.log('==========================onRunEnd');
              setIsRouletteVisible(false);
              setIsRunning(false);

              if (getRandomGiftData?.data.winGift) {
                setWinGift(getRandomGiftData?.data.winGift);
              }

              setTimeout(() => {
                setIsRouletteVisible(true);
                setWinGift(null);
                lottie.destroy(winGift?.title);
              }, 5000);
            }}
          />
        )}
        {winGift && <Confetti />}
        {winGift && (
          <div className={s.giftContainer}>
            <img className={s.circle} src={circle} width={206} height={206} />
            <div ref={ref} style={{width: 200, height: 200}} />
            <span className={s.giftTitle}>
              {winGift ? `${winGift?.title} #${winGift?.num}` : ''}
            </span>
          </div>
        )}
        {isRouletteVisible && (
          <div
            className={classNames(s.backdrop, {
              [s.backdropAnimation]: isRunning,
            })}
          />
        )}
      </div>

      <div className={s.footer}>
        <div className={s.btnContainer}>
          {!!userBalance ? (
            <SwipeButton
              onSwipe={() => {
                setIsRunning(true);
                getRandomGift();
              }}
              isRunning={isRunning}
              showDisabled={!isRouletteVisible || isRunning}
            />
          ) : (
            <TopUpButton
              onClick={() => {
                navigate(ROUTES.BALANCE);
              }}
            />
          )}
        </div>

        <MyGifts />
      </div>
      {!isRunning && (
        <BG style={{color: getHex(winGift?.backdrop?.edgeColor || 0)}} />
      )}
    </div>
  );
};
