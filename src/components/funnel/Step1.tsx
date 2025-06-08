
import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface Step1Props {
  onNext: () => void;
  onCompetenceScore: (score: number) => void;
}

export const Step1: React.FC<Step1Props> = ({ onNext, onCompetenceScore }) => {
  const handleNext = () => {
    onCompetenceScore(10);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Por que a Maioria dos Treinos de Glúteo Falha
        </h1>
        <p className="text-xl text-muted-foreground">
          E como corrigir os 3 erros mais comuns
        </p>
      </div>

      <div className="grid md:grid-cols-1 gap-8 mb-12">
        <div className="bg-background border border-border rounded-lg p-8">
          <div className="flex items-start space-x-4 mb-6">
            <AlertCircle className="w-8 h-8 text-red-500 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">ERRO #1: Falta de progressão de carga</h3>
              <div className="space-y-3 text-foreground">
                <p>• O glúteo é um músculo forte que se adapta rápido</p>
                <p>• Fazer sempre os mesmos exercícios estagna em 2 semanas</p>
                <p>• <strong>Solução:</strong> Progressão por tempo, repetições e variações</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-8">
          <div className="flex items-start space-x-4 mb-6">
            <AlertCircle className="w-8 h-8 text-red-500 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">ERRO #2: Exercícios que não isolam o glúteo</h3>
              <div className="space-y-3 text-foreground">
                <p>• Agachamento comum recruta mais quadríceps</p>
                <p>• Muitos exercícios 'famosos' são ineficazes para glúteo</p>
                <p>• <strong>Solução:</strong> Exercícios com ativação EMG comprovada</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-8">
          <div className="flex items-start space-x-4 mb-6">
            <AlertCircle className="w-8 h-8 text-red-500 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">ERRO #3: Volume inadequado</h3>
              <div className="space-y-3 text-foreground">
                <p>• Muito pouco: sem estímulo para crescimento</p>
                <p>• Muito: overtraining e abandono</p>
                <p>• <strong>Solução:</strong> 12-16 séries semanais, distribuídas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-8 mb-12">
        <div className="flex items-start space-x-4">
          <TrendingUp className="w-8 h-8 text-secondary mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Base Científica Comprovada</h3>
            <div className="space-y-3 text-foreground">
              <p>• Análise de mais de 500 rotinas de treino caseiro</p>
              <p>• Estudos de ativação muscular via eletromiografia</p>
              <p>• Teste com 200+ alunas em ambiente controlado</p>
              <p>• Referências científicas disponíveis para consulta</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={handleNext}
          size="lg"
          className="px-8 py-4 text-lg"
        >
          Quero conhecer o método correto
        </Button>
      </div>
    </div>
  );
};
