
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Clock, Target, TrendingUp } from 'lucide-react';

interface Step3Props {
  onNext: () => void;
  onUpdateProfile: (updates: any) => void;
}

export const Step3: React.FC<Step3Props> = ({ onNext, onUpdateProfile }) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('');

  const goals = [
    {
      id: 'firmness',
      label: 'Aumentar firmeza e tonicidade',
      timeline: 'Resultado perceptível em 2-3 semanas',
      details: 'Melhora na textura e consistência muscular'
    },
    {
      id: 'volume',
      label: 'Ganhar volume visível',
      timeline: 'Primeiros sinais em 3-4 semanas, resultado claro em 8-12 semanas',
      details: 'Aumento real da massa muscular dos glúteos'
    },
    {
      id: 'shape',
      label: 'Melhorar formato e projeção',
      timeline: 'Mudanças graduais visíveis a partir da 4ª semana',
      details: 'Melhora no contorno e definição da região'
    },
    {
      id: 'lift',
      label: 'Definir e "levantar" o glúteo',
      timeline: 'Efeito lifting perceptível em 3-5 semanas',
      details: 'Melhora na posição e sustentação muscular'
    }
  ];

  const handleNext = () => {
    if (selectedGoal) {
      onUpdateProfile({ specificGoal: selectedGoal });
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Definindo Expectativas Realistas
        </h1>
        <p className="text-xl text-muted-foreground">
          O que é possível alcançar em 30 dias de treino consistente
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-foreground mb-6">
          Qual seu objetivo principal?
        </h3>
        
        <div className="grid gap-6">
          {goals.map((goal) => (
            <Card 
              key={goal.id}
              className={`p-6 cursor-pointer transition-all duration-200 ${
                selectedGoal === goal.id 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-5 h-5 rounded-full border-2 mt-1 ${
                  selectedGoal === goal.id 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground'
                }`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">
                    {goal.label}
                  </h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <p className="text-secondary font-medium text-sm">
                      {goal.timeline}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {goal.details}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-4">
          <Target className="w-6 h-6 text-yellow-600 mt-1" />
          <div>
            <h4 className="font-semibold text-foreground mb-3">Fatores que Influenciam o Resultado</h4>
            <div className="space-y-2 text-foreground text-sm">
              <p>• <strong>Genética:</strong> Determina velocidade de resposta e potencial máximo</p>
              <p>• <strong>Alimentação:</strong> Proteína adequada acelera recuperação e crescimento</p>
              <p>• <strong>Consistência:</strong> Treinar todos os dias programados é fundamental</p>
              <p>• <strong>Descanso:</strong> Músculos crescem durante o repouso, não no treino</p>
              <p>• <strong>Hidratação:</strong> Essencial para performance e recuperação</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={handleNext}
          disabled={!selectedGoal}
          size="lg"
          className="px-8 py-4 text-lg"
        >
          Continuar para metodologia
        </Button>
      </div>
    </div>
  );
};
