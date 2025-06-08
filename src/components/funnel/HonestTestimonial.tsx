
import React from 'react';
import { CheckCircle, User } from 'lucide-react';
import { TestimonialProps } from '../../types/funnel';

export const HonestTestimonial: React.FC<TestimonialProps> = ({
  name,
  age,
  result,
  timeframe,
  verified
}) => {
  return (
    <div className="bg-background border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-secondary-foreground" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-semibold text-foreground">{name}, {age} anos</h4>
            {verified && <CheckCircle className="w-4 h-4 text-green-600" />}
          </div>
          <p className="text-foreground mb-2 italic">"{result}"</p>
          <p className="text-muted-foreground text-sm">
            <strong>Tempo de resultado:</strong> {timeframe}
          </p>
        </div>
      </div>
    </div>
  );
};
