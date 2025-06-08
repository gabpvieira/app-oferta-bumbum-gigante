
import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { GameButton } from '../ui/game-button';
import { useFunnelNavigation } from '../../hooks/useFunnelNavigation';

interface Step1Props {
  onNext: () => void;
  onCompetenceScore: (score: number) => void;
}

export const Step1: React.FC<Step1Props> = ({ onNext, onCompetenceScore }) => {
  const { goNext } = useFunnelNavigation();

  const handleNext = () => {
    onCompetenceScore(10);
    goNext(0, 8, onNext);
  };

  return (
    <div className="mobile-container" data-step="current">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-12 animate-fade-scale">
          <h1 className="headline-lg text-foreground mb-4 text-balance">
            Por que a Maioria dos Treinos de Glúteo Falha
          </h1>
          <p className="body-lg text-muted-foreground text-balance">
            E como corrigir os 3 erros mais comuns
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="mobile-card stagger-item border-l-4 border-l-red-500">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="headline-md text-foreground mb-4">
                  ERRO #1: Falta de progressão de carga
                </h3>
                <div className="space-y-3 text-foreground body-md">
                  <p>• O glúteo é um músculo forte que se adapta rápido</p>
                  <p>• Fazer sempre os mesmos exercícios estagna em 2 semanas</p>
                  <p>• <strong>Solução:</strong> Progressão por tempo, repetições e variações</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-card stagger-item border-l-4 border-l-red-500">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="headline-md text-foreground mb-4">
                  ERRO #2: Exercícios que não isolam o glúteo
                </h3>
                <div className="space-y-3 text-foreground body-md">
                  <p>• Agachamento comum recruta mais quadríceps</p>
                  <p>• Muitos exercícios 'famosos' são ineficazes para glúteo</p>
                  <p>• <strong>Solução:</strong> Exercícios com ativação EMG comprovada</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-card stagger-item border-l-4 border-l-red-500">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="headline-md text-foreground mb-4">
                  ERRO #3: Volume inadequado
                </h3>
                <div className="space-y-3 text-foreground body-md">
                  <p>• Muito pouco: sem estímulo para crescimento</p>
                  <p>• Muito: overtraining e abandono</p>
                  <p>• <strong>Solução:</strong> 12-16 séries semanais, distribuídas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card mb-12">
          <div className="flex items-start space-x-4">
            <TrendingUp className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
            <div>
              <h3 className="body-lg font-semibold text-foreground mb-4">
                Base Científica Comprovada
              </h3>
              <div className="space-y-3 text-foreground body-md">
                <p>• Análise de mais de 500 rotinas de treino caseiro</p>
                <p>• Estudos de ativação muscular via eletromiografia</p>
                <p>• Teste com 200+ alunas em ambiente controlado</p>
                <p>• Referências científicas disponíveis para consulta</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pb-8">
          <GameButton 
            onClick={handleNext}
            size="lg"
            className="w-full max-w-sm px-8 py-4 text-lg animate-pulse"
            soundType="success"
          >
            Quero conhecer o método correto
          </GameButton>
        </div>
      </div>
    </div>
  );
};
