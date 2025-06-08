
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface Step2Props {
  onNext: () => void;
  onUpdateProfile: (updates: any) => void;
}

export const Step2: React.FC<Step2Props> = ({ onNext, onUpdateProfile }) => {
  const [selectedSituation, setSelectedSituation] = useState<string>('');

  const situations = [
    {
      id: 'sedentary',
      label: 'Sedentária há mais de 6 meses',
      description: 'Protocolo de ativação gradual e segura'
    },
    {
      id: 'irregular',
      label: 'Faço exercícios 1-2x por semana, irregular',
      description: 'Foco em consistência e progressão controlada'
    },
    {
      id: 'regular',
      label: 'Treino regular, mas sem foco em glúteos',
      description: 'Adaptação para especificidade de glúteos'
    },
    {
      id: 'failed',
      label: 'Já tentei outros métodos de glúteo sem sucesso',
      description: 'Análise dos erros anteriores e nova abordagem'
    }
  ];

  const handleNext = () => {
    if (selectedSituation) {
      onUpdateProfile({ currentSituation: selectedSituation });
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Vamos Identificar seu Ponto de Partida
        </h1>
        <p className="text-xl text-muted-foreground">
          Para personalizar o protocolo para sua situação específica
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-foreground mb-6">
          Qual sua situação atual com exercícios?
        </h3>
        
        <div className="grid gap-4">
          {situations.map((situation) => (
            <Card 
              key={situation.id}
              className={`p-6 cursor-pointer transition-all duration-200 ${
                selectedSituation === situation.id 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setSelectedSituation(situation.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-5 h-5 rounded-full border-2 mt-1 ${
                  selectedSituation === situation.id 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground'
                }`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">
                    {situation.label}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {situation.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 mb-8">
        <h4 className="font-semibold text-foreground mb-3">Por que essa informação é importante?</h4>
        <div className="space-y-2 text-foreground">
          <p>• <strong>Intensidade inicial:</strong> Começamos no seu nível atual</p>
          <p>• <strong>Velocidade de progressão:</strong> Respeitamos seu condicionamento</p>
          <p>• <strong>Adaptações necessárias:</strong> Exercícios adequados para você</p>
          <p>• <strong>Expectativas realistas:</strong> Timeline honesto baseado no seu perfil</p>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={handleNext}
          disabled={!selectedSituation}
          size="lg"
          className="px-8 py-4 text-lg"
        >
          Continuar análise
        </Button>
      </div>
    </div>
  );
};
