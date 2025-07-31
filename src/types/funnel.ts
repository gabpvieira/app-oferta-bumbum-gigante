
export interface UserProfile {
  currentSituation: string;
  specificGoal: string;
  availableTime: number;
  experienceLevel: string;
}

export interface FunnelState {
  currentStep: number;
  userProfile: UserProfile;
  competenceScore: number;
  readyToBuy: boolean;
  totalSteps: number;
}

export interface CompetenceProofProps {
  credential: string;
  verification: string;
  relevance: string;
}

export interface TestimonialProps {
  name: string;
  age: number;
  result: string;
  timeframe: string;
  photo: string;
  verified: boolean;
}
