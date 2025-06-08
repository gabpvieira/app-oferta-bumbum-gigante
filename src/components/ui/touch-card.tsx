
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useGameAudio } from '../../hooks/useGameAudio';
import { Card } from './card';

interface TouchCardProps {
  option: {
    id: string;
    label: string;
    description: string;
    icon?: string;
  };
  selected: boolean;
  onSelect: (option: any) => void;
  index?: number;
}

export const TouchCard: React.FC<TouchCardProps> = ({
  option,
  selected,
  onSelect,
  index = 0
}) => {
  const { playSound } = useGameAudio();
  const [isPressed, setIsPressed] = useState(false);

  const handleSelect = () => {
    playSound('click');
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(15);
    }
    
    onSelect(option);
  };

  const handleTouchStart = () => {
    setIsPressed(true);
    playSound('hover', 0.05);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  return (
    <Card 
      className={`touch-card stagger-item ${selected ? 'selected' : ''} ${isPressed ? 'pressed' : ''}`}
      onClick={handleSelect}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-5 h-5 rounded-full border-2 mt-1 transition-all duration-200 ${
          selected 
            ? 'border-primary bg-primary' 
            : 'border-muted-foreground'
        }`}>
          {selected && (
            <CheckCircle className="w-3 h-3 text-white transform scale-75" />
          )}
        </div>
        
        {option.icon && (
          <div className="text-2xl">{option.icon}</div>
        )}
        
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-2 body-md">
            {option.label}
          </h4>
          <p className="text-muted-foreground text-sm caption">
            {option.description}
          </p>
        </div>
        
        {selected && (
          <div className="text-primary">
            <CheckCircle className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
};
