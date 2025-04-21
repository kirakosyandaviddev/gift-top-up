import {useEffect, useMemo, useState} from 'react';
import classNames from 'classnames';
import {useNavigate} from 'react-router-dom';

import {useRandomGiftMutation} from '../../hooks/data/mutations/useRandomGiftMutation';
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
import {getRandomSpinDuration, Roulette} from './components/Roulette/Roulette';
import {Gift} from '../../etities/types/Gift';
import {GiftIcons} from './components/GiftIcons/GiftIcons';
import {useGetPrices} from '../../hooks/data/queries/useGetPrices';
import {BackdropAnimation} from './components/BackdropAnimation/BackdropAnimation';

import circle from './svg/circle.svg';
import {LottiePlayer} from '../../components/LottiePlayer/LottiePlayer';

export const RoulettePage = () => {
  const navigate = useNavigate();
  const {data: getInfoData} = useGetInfo();
  const {mutate: getRandomGift, data: getRandomGiftData} =
    useRandomGiftMutation();
  const {data: pricesData} = useGetPrices();

  const [isRunning, setIsRunning] = useState(false);
  const [isRouletteVisible, setIsRouletteVisible] = useState(true);
  const [winGift, setWinGift] = useState<null | Gift>(null);

  const userBalance = getInfoData?.data?.user?.balance || 0;
  const play = getInfoData?.data?.play || 0;
  const insufficientBalance = userBalance < play;

  const handleCloseWinScreen = () => {
    setIsRouletteVisible(true);
    setWinGift(null);
  };

  useEffect(() => {
    if (winGift) {
      window.addEventListener('click', handleCloseWinScreen);
    }

    return () => {
      window.removeEventListener('click', handleCloseWinScreen);
    };
  }, [winGift]);

  const targetId = useMemo<string>(() => {
    const index = getRandomGiftData?.data?.index || 0;
    const price = pricesData?.data.find((_, i) => i === index);
    return price?.id || '';
  }, [pricesData?.data]);

  const spinDuration = useMemo(() => getRandomSpinDuration(), [isRunning]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.titleContainer}>
          <h3 className={s.title}>Roulette</h3>
          <img src={titleOverlay} draggable={false} />
        </div>
        <div
          role="button"
          className={classNames(s.balanceContainer, {
            [s.empty]: getInfoData?.data?.user ? insufficientBalance : false,
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
        </div>
      </div>

      {winGift && <Confetti />}

      {isRouletteVisible && (
        <div className={s.rouletteContent}>
          <Roulette
            pricesData={pricesData?.data}
            isRunning={isRunning}
            duration={spinDuration}
            targetId={targetId}
            onRunEnd={() => {
              setIsRouletteVisible(false);
              setIsRunning(false);

              if (getRandomGiftData?.data.gift) {
                setWinGift(getRandomGiftData?.data.gift);
              }
            }}
          />
        </div>
      )}

      {isRouletteVisible && isRunning && (
        <BackdropAnimation
          pricesData={pricesData?.data}
          isRunning={isRunning}
          duration={spinDuration}
          targetId={targetId}
        />
      )}

      {winGift && (
        <div className={s.giftContent}>
          <GiftIcons
            animationUrl={winGift.pattern.animationUrl}
            title={winGift.title}
          />
          <div className={s.giftContainer}>
            <img className={s.circle} src={circle} width={206} height={206} />
            <LottiePlayer
              animationUrl={winGift.model.animationUrl}
              title={winGift.title}
              autoplay
              loop
              width={200}
              height={200}
            />
            <span className={s.giftTitle}>
              {`${winGift?.title} #${winGift?.num}`}
            </span>
          </div>
        </div>
      )}

      <div className={s.footer}>
        <div className={s.btnContainer}>
          {!insufficientBalance ? (
            <SwipeButton
              onSwipe={() => {
                setIsRunning(true);
                getRandomGift();
              }}
              isRunning={isRunning}
              showDisabled={!isRouletteVisible || isRunning}
              playAmount={getInfoData?.data?.play}
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
