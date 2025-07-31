
import { useState, useCallback, TouchEvent } from 'react';

interface TouchGestureHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export const useTouchGestures = (onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;

    // Determine primary direction
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isLeftSwipe) onSwipe?.('left');
      if (isRightSwipe) onSwipe?.('right');
    } else {
      if (isUpSwipe) onSwipe?.('up');
      if (isDownSwipe) onSwipe?.('down');
    }
  }, [touchStart, touchEnd, onSwipe]);

  return { onTouchStart, onTouchMove, onTouchEnd };
};
