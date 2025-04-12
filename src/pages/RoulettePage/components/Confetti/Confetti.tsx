import ReactConfetti from 'react-confetti-boom';

export const Confetti = () => {
  return (
    <ReactConfetti
      mode="boom"
      particleCount={180}
      effectInterval={5000}
      // deg={90}
      // effectCount={100}
      y={0.5}
      x={0.5}
      launchSpeed={1}
      colors={[
        '#FC9826',
        '#F95890',
        '#F8F74A',
        '#2FD6C9',
        '#42D636',
        '#FCCA1C',
        '#41D535',
        '#2C67EA',
      ]}
    />
  );
};
