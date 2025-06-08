
import { useCallback } from 'react';
import { useGameAudio } from './useGameAudio';

export const useFunnelNavigation = () => {
  const { playSound } = useGameAudio();

  const navigateToStep = useCallback((
    currentStep: number, 
    newStep: number, 
    onStepChange: (step: number) => void
  ) => {
    // Play transition sound
    playSound('transition');

    // Animate out current step
    const currentElement = document.querySelector('[data-step="current"]');
    if (currentElement) {
      currentElement.classList.add('animate-slide-out');
    }

    // Update step after animation
    setTimeout(() => {
      onStepChange(newStep);

      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Animate in new step
      setTimeout(() => {
        const newElement = document.querySelector('[data-step="current"]');
        if (newElement) {
          newElement.classList.add('animate-slide-up');
        }

        // Play step complete sound
        if (newStep > currentStep) {
          playSound('stepComplete');
        }
      }, 100);
    }, 200);
  }, [playSound]);

  const goNext = useCallback((
    currentStep: number,
    totalSteps: number,
    onNext: () => void
  ) => {
    if (currentStep < totalSteps - 1) {
      playSound('click');
      setTimeout(() => {
        onNext();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [playSound]);

  const goPrevious = useCallback((
    currentStep: number,
    onPrevious: () => void
  ) => {
    if (currentStep > 0) {
      playSound('click');
      setTimeout(() => {
        onPrevious();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [playSound]);

  return {
    navigateToStep,
    goNext,
    goPrevious
  };
};
