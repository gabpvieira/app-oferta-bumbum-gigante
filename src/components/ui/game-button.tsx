
import React, { useState } from 'react';
import { useGameAudio } from '../../hooks/useGameAudio';
import { Button, ButtonProps } from './button';

interface GameButtonProps extends ButtonProps {
  soundType?: 'click' | 'success' | 'hover';
  haptic?: boolean;
}

export const GameButton: React.FC<GameButtonProps> = ({
  onClick,
  onMouseEnter,
  onTouchStart,
  children,
  soundType = 'click',
  haptic = true,
  className = '',
  ...props
}) => {
  const { playSound } = useGameAudio();
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound(soundType);
    
    // Haptic feedback for mobile devices
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    onClick?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound('hover', 0.1);
    onMouseEnter?.(e);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    setIsPressed(true);
    playSound('hover', 0.05);
    
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(5);
    }
    
    onTouchStart?.(e);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  return (
    <Button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`btn-primary touch-target transition-all duration-300 ${isPressed ? 'pressed' : ''} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};
