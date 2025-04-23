import {useEffect} from 'react';

export function useSwipeUp(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  threshold = 50,
) {
  useEffect(() => {
    let startY = 0;
    let validStart = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (!ref.current) return;

      const touch = e.touches[0];
      const bounds = ref.current.getBoundingClientRect();

      // Check if touch started inside the element
      if (
        touch.clientX >= bounds.left &&
        touch.clientX <= bounds.right &&
        touch.clientY >= bounds.top &&
        touch.clientY <= bounds.bottom
      ) {
        startY = touch.clientY;
        validStart = true;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!validStart) return;

      const endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;

      if (deltaY > threshold) {
        callback();
      }

      validStart = false;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, callback, threshold]);
}
