
import React from 'react';
import { useFunnelLogic } from '../hooks/useFunnelLogic';
import { ProgressIndicator } from '../components/funnel/ProgressIndicator';
import { Step1 } from '../components/funnel/Step1';
import { Step2 } from '../components/funnel/Step2';
import { Step3 } from '../components/funnel/Step3';
import { Step4 } from '../components/funnel/Step4';
import { Step5 } from '../components/funnel/Step5';
import { Step6 } from '../components/funnel/Step6';
import { Step7 } from '../components/funnel/Step7';
import { Step8 } from '../components/funnel/Step8';
import { GameButton } from '../components/ui/game-button';
import { ArrowLeft } from 'lucide-react';
import { useFunnelNavigation } from '../hooks/useFunnelNavigation';

const Funnel = () => {
  const {
    funnelState,
    nextStep,
    prevStep,
    updateUserProfile,
    updateCompetenceScore,
    goToStep
  } = useFunnelLogic();

  const { goPrevious } = useFunnelNavigation();

  const handlePrevStep = () => {
    goPrevious(funnelState.currentStep, prevStep);
  };

  const renderStep = () => {
    switch (funnelState.currentStep) {
      case 0:
        return <Step1 onNext={nextStep} onCompetenceScore={updateCompetenceScore} />;
      case 1:
        return <Step2 onNext={nextStep} onUpdateProfile={updateUserProfile} />;
      case 2:
        return <Step3 onNext={nextStep} onUpdateProfile={updateUserProfile} />;
      case 3:
        return <Step4 onNext={nextStep} />;
      case 4:
        return <Step5 onNext={nextStep} />;
      case 5:
        return <Step6 onNext={nextStep} />;
      case 6:
        return <Step7 onNext={nextStep} />;
      case 7:
        return <Step8 userProfile={funnelState.userProfile} />;
      default:
        return <Step1 onNext={nextStep} onCompetenceScore={updateCompetenceScore} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {funnelState.currentStep > 0 && (
          <div className="mb-8 animate-fade-scale">
            <GameButton
              variant="ghost"
              onClick={handlePrevStep}
              className="flex items-center space-x-2 hover:bg-muted"
              soundType="click"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </GameButton>
          </div>
        )}
        
        <ProgressIndicator 
          currentStep={funnelState.currentStep} 
          totalSteps={funnelState.totalSteps} 
        />
        
        <div className="animate-slide-up">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Funnel;
