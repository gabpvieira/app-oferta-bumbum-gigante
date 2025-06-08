
import React, { useState } from 'react';
import { GameButton } from '../ui/game-button';
import { TouchCard } from '../ui/touch-card';
import { useFunnelNavigation } from '../../hooks/useFunnelNavigation';

interface Step2Props {
  onNext: () => void;
  onUpdateProfile: (updates: any) => void;
}

export const Step2: React.FC<Step2Props> = ({ onNext, onUpdateProfile }) => {
  const [selectedSituation, setSelectedSituation] = useState<string>('');
  const { goNext } = useFunnelNavigation();

  const situations = [
    {
      id: 'sedentary',
      label: 'Sedentária há mais de 6 meses',
      description: 'Protocolo de ativação gradual e segura',
      icon: '🪑'
    },
    {
      id: 'irregular',
      label: 'Faço exercícios 1-2x por semana, irregular',
      description: 'Foco em consistência e progressão controlada',
      icon: '📅'
    },
    {
      id: 'regular',
      label: 'Treino regular, mas sem foco em glúteos',
      description: 'Adaptação para especificidade de glúteos',
      icon: '💪'
    },
    {
      id: 'failed',
      label: 'Já tentei outros métodos de glúteo sem sucesso',
      description: 'Análise dos erros anteriores e nova abordagem',
      icon: '🔄'
    }
  ];

  const handleNext = () => {
    if (selectedSituation) {
      onUpdateProfile({ currentSituation: selectedSituation });
      goNext(1, 8, onNext);
    }
  };

  const handleSelect = (option: any) => {
    setSelectedSituation(option.id);
  };

  return (
    <div className="mobile-container" data-step="current">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-12 animate-fade-scale">
          <h1 className="headline-lg text-foreground mb-4 text-balance">
            Vamos Identificar seu Ponto de Partida
          </h1>
          <p className="body-lg text-muted-foreground text-balance">
            Para personalizar o protocolo para sua situação específica
          </p>
        </div>

        <div className="mb-8">
          <h3 className="headline-md text-foreground mb-6 text-center">
            Qual sua situação atual com exercícios?
          </h3>
          
          <div className="space-y-4">
            {situations.map((situation, index) => (
              <TouchCard
                key={situation.id}
                option={situation}
                selected={selectedSituation === situation.id}
                onSelect={handleSelect}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="glass-card mb-8">
          <h4 className="font-semibold text-foreground mb-3 body-lg">
            Por que essa informação é importante?
          </h4>
          <div className="space-y-2 text-foreground body-md">
            <p>• <strong>Intensidade inicial:</strong> Começamos no seu nível atual</p>
            <p>• <strong>Velocidade de progressão:</strong> Respeitamos seu condicionamento</p>
            <p>• <strong>Adaptações necessárias:</strong> Exercícios adequados para você</p>
            <p>• <strong>Expectativas realistas:</strong> Timeline honesto baseado no seu perfil</p>
          </div>
        </div>

        <div className="text-center pb-8">
          <GameButton 
            onClick={handleNext}
            disabled={!selectedSituation}
            size="lg"
            className="w-full max-w-sm px-8 py-4 text-lg"
            soundType="success"
          >
            Continuar análise
          </GameButton>
        </div>
      </div>
    </div>
  );
};
