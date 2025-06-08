
import React, { useEffect, useState } from 'react';
import { useGameAudio } from '../../hooks/useGameAudio';

interface AnimatedProgressProps {
  progress: number;
  total: number;
  showPercentage?: boolean;
  className?: string;
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  progress,
  total,
  showPercentage = true,
  className = ''
}) => {
  const { playSound } = useGameAudio();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [hasPlayedSound, setHasPlayedSound] = useState(false);

  useEffect(() => {
    const targetProgress = Math.min((progress / total) * 100, 100);
    const duration = 800;
    const steps = 60;
    const increment = (targetProgress - displayProgress) / steps;

    if (Math.abs(targetProgress - displayProgress) < 1) return;

    let current = displayProgress;
    const timer = setInterval(() => {
      current += increment;
      setDisplayProgress(Math.min(current, targetProgress));

      if (current >= targetProgress) {
        setDisplayProgress(targetProgress);
        clearInterval(timer);
        
        // Play sound only when progress increases significantly
        if (targetProgress > displayProgress + 10 && !hasPlayedSound) {
          playSound('progress');
          setHasPlayedSound(true);
        }
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [progress, total, displayProgress, playSound, hasPlayedSound]);

  // Reset sound flag when progress changes significantly
  useEffect(() => {
    setHasPlayedSound(false);
  }, [progress]);

  return (
    <div className={`progress-container ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Etapa {progress} de {total}
        </span>
        {showPercentage && (
          <span className="text-sm font-medium text-primary">
            {Math.round(displayProgress)}%
          </span>
        )}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </div>
  );
};
