
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { BookOpen, BarChart3, Calendar, Users } from 'lucide-react';

interface Step4Props {
  onNext: () => void;
}

export const Step4: React.FC<Step4Props> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Como o Método DNA do Bumbum Funciona
        </h1>
        <p className="text-xl text-muted-foreground">
          A ciência por trás dos exercícios e da progressão
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="p-8">
          <div className="flex items-start space-x-4 mb-6">
            <BookOpen className="w-8 h-8 text-primary mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Base Científica</h3>
              <div className="space-y-3 text-foreground">
                <p>• Estudos de ativação EMG dos músculos glúteos</p>
                <p>• Pesquisas de hipertrofia com treino em casa</p>
                <p>• Biomecânica de movimento para máxima ativação</p>
                <p>• Princípios de sobrecarga progressiva</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-start space-x-4 mb-6">
            <Users className="w-8 h-8 text-secondary mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Validação Prática</h3>
              <div className="space-y-3 text-foreground">
                <p>• Teste com mais de 200 alunas</p>
                <p>• Acompanhamento de resultados por 12 meses</p>
                <p>• Ajustes baseados em feedback real</p>
                <p>• Adaptações para diferentes perfis</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
          Estrutura do Protocolo de 30 Dias
        </h3>
        
        <div className="space-y-6">
          <Card className="p-8 border-l-4 border-l-primary">
            <div className="flex items-start space-x-4">
              <Calendar className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  Semanas 1-2: Ativação e Aprendizado Motor
                </h4>
                <div className="space-y-2 text-foreground">
                  <p>• Foco na execução correta dos movimentos</p>
                  <p>• Estabelecimento da conexão mente-músculo</p>
                  <p>• 8-10 séries semanais distribuídas</p>
                  <p>• Tempo de treino: 15-20 minutos por sessão</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-l-4 border-l-secondary">
            <div className="flex items-start space-x-4">
              <BarChart3 className="w-6 h-6 text-secondary mt-1" />
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  Semanas 3-4: Intensificação e Volume
                </h4>
                <div className="space-y-2 text-foreground">
                  <p>• Aumento de repetições e tempo sob tensão</p>
                  <p>• Introdução de variações mais desafiadoras</p>
                  <p>• 12-16 séries semanais distribuídas</p>
                  <p>• Tempo de treino: 20-25 minutos por sessão</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8 mb-12">
        <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
          Diferencial Técnico Comprovado
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">EMG Validado</h4>
            <p className="text-sm text-muted-foreground">Exercícios com máxima ativação muscular comprovada</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-secondary" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Periodização</h4>
            <p className="text-sm text-muted-foreground">Progressão baseada em princípios científicos</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Personalização</h4>
            <p className="text-sm text-muted-foreground">Adaptações para limitações individuais</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={onNext}
          size="lg"
          className="px-8 py-4 text-lg"
        >
          Ver resultados reais de alunas
        </Button>
      </div>
    </div>
  );
};
