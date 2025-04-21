import {memo} from 'react';

export const LottiePlayer = memo(
  ({
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
        key={title}
        name={title}
        src={animationUrl}
        autoplay={autoplay}
        loop={loop}
        mode="normal"
        width={width}
        height={height}
        style={{width, height}}
      />
    );
  },
);
