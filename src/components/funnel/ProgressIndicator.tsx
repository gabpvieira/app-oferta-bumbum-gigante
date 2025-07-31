
import React from 'react';
import { AnimatedProgress } from '../ui/animated-progress';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  showPercentage?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  showPercentage = true
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <AnimatedProgress 
        progress={currentStep + 1}
        total={totalSteps}
        showPercentage={showPercentage}
      />
    </div>
  );
};
