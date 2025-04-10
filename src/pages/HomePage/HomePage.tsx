import {useEffect} from 'react';
import {motion} from 'framer-motion';

import {BalanceCard} from './components/BalanceCard/BalanceCard';
import {RouletteCard} from './components/RouletteCard/RouletteCard';
import {GiftboxesCard} from './components/GiftboxesCard/GiftboxesCard';
import {MyGifts} from '../../components/MyGifts/MyGifts';
import {useGetConfigQuery} from '../../hooks/data/queries/useGetConfigQuery';
import {useWebApp} from '../../hooks/useWebApp';

import titleOverlay from '/svg/homePage-title-overlay.svg';

import s from './HomePage.module.css';

const cardVariants = {
  hidden: {opacity: 0, y: 50},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

export const HomePage = () => {
  const {data} = useGetConfigQuery();
  const WebApp = useWebApp();
  WebApp.BackButton.hide();

  useEffect(() => {
    if (WebApp?.BackButton?.isVisible) {
      WebApp?.BackButton.hide();
    }
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
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{once: true}}
          >
            {CardComponent}
          </motion.div>
        ))}
      </div>

      <MyGifts />
    </div>
  );
};
