import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import {BalanceCard} from './components/BalanceCard/BalanceCard';
import {RouletteCard} from './components/RouletteCard/RouletteCard';
import {GiftboxesCard} from './components/GiftboxesCard/GiftboxesCard';
import {MyGifts} from '../../components/MyGifts/MyGifts';
import {useGetInfo} from '../../hooks/data/queries/useGetInfo';

import titleOverlay from '/svg/homePage-title-overlay.svg';

import s from './HomePage.module.css';

gsap.registerPlugin(ScrollTrigger);

export const HomePage = () => {
  const {data} = useGetInfo();

  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!cardsRef.current.length) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        {opacity: 0, y: 50},
        {
          opacity: 1,
          y: 0,
          delay: index * 0.05,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
  }, []);

  const cards = [
    <BalanceCard balance={data?.data?.user?.balance} />,
    <RouletteCard />,
    <GiftboxesCard />,
  ];

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <h3 className={s.title}>Gifts Games</h3>
        <img src={titleOverlay} draggable={false} />
      </div>

      <div className={s.list}>
        {cards.map((CardComponent, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className={s.cardWrapper}
          >
            {CardComponent}
          </div>
        ))}
      </div>

      <div className={s.footer}>
        <MyGifts />
      </div>
    </div>
  );
};
