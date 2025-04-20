export const LottiePlayer = ({
  animationUrl,
  title = '',
  autoplay,
  loop,
  width = 180,
  height = 180,
}: {
  animationUrl: string;
  title?: string;
  autoplay: boolean;
  loop: boolean;
  width?: number;
  height?: number;
}) => {
  return (
    // @ts-ignore
    <tgs-player
      name={title}
      src={animationUrl}
      autoplay={autoplay}
      loop={loop}
      mode="normal"
      style={{width, height}}
    />
  );
};
