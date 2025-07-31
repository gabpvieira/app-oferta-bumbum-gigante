
import { useState, useCallback } from 'react';
import { FunnelState, UserProfile } from '../types/funnel';

const initialUserProfile: UserProfile = {
  currentSituation: '',
  specificGoal: '',
  availableTime: 0,
  experienceLevel: ''
};

const initialState: FunnelState = {
  currentStep: 0,
  userProfile: initialUserProfile,
  competenceScore: 0,
  readyToBuy: false,
  totalSteps: 8
};

export const useFunnelLogic = () => {
  const [funnelState, setFunnelState] = useState<FunnelState>(initialState);

  const nextStep = useCallback(() => {
    setFunnelState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps - 1)
    }));
  }, []);

  const prevStep = useCallback(() => {
    setFunnelState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  }, []);

  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setFunnelState(prev => ({
      ...prev,
      userProfile: { ...prev.userProfile, ...updates }
    }));
  }, []);

  const updateCompetenceScore = useCallback((score: number) => {
    setFunnelState(prev => ({
      ...prev,
      competenceScore: prev.competenceScore + score
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setFunnelState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, prev.totalSteps - 1))
    }));
  }, []);

  return {
    funnelState,
    nextStep,
    prevStep,
    updateUserProfile,
    updateCompetenceScore,
    goToStep
  };
};
