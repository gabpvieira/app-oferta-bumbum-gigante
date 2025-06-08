
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { CompetenceProofProps } from '../../types/funnel';

export const CompetenceProof: React.FC<CompetenceProofProps> = ({
  credential,
  verification,
  relevance
}) => {
  return (
    <div className="bg-background border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-4">
        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-foreground mb-2">{credential}</h4>
          <p className="text-muted-foreground text-sm mb-2">{verification}</p>
          <p className="text-accent-foreground text-sm">{relevance}</p>
        </div>
      </div>
    </div>
  );
};
