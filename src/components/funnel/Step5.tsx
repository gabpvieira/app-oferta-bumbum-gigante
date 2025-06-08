
import React from 'react';
import { Button } from '../ui/button';
import { HonestTestimonial } from './HonestTestimonial';
import { Card } from '../ui/card';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface Step5Props {
  onNext: () => void;
}

export const Step5: React.FC<Step5Props> = ({ onNext }) => {
  const testimonials = [
    {
      name: "Marina",
      age: 28,
      result: "O método é bem estruturado. Nas primeiras semanas senti os músculos ativando como nunca. O resultado apareceu gradualmente, sem pressa.",
      timeframe: "6 semanas de treino",
      photo: "marina.jpg",
      verified: true
    },
    {
      name: "Carla",
      age: 24,
      result: "Estava sedentária há 8 meses. O protocolo me ajudou a voltar aos exercícios de forma segura. Sinto os glúteos muito mais firmes.",
      timeframe: "4 semanas de treino",
      photo: "carla.jpg",
      verified: true
    },
    {
      name: "Ana Paula",
      age: 32,
      result: "Já tinha tentado outros métodos sem sucesso. A diferença aqui foi a progressão inteligente e os exercícios realmente eficazes.",
      timeframe: "8 semanas de treino",
      photo: "ana.jpg",
      verified: true
    },
    {
      name: "Fernanda",
      age: 26,
      result: "Como alguém que treina regular, estava focando nos exercícios errados. O método me ensinou quais realmente funcionam para glúteo.",
      timeframe: "5 semanas de treino",
      photo: "fernanda.jpg",
      verified: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Resultados de Alunas Reais
        </h1>
        <p className="text-xl text-muted-foreground">
          Documentação fotográfica e depoimentos verificados
        </p>
      </div>

      <div className="grid gap-6 mb-12">
        {testimonials.map((testimonial, index) => (
          <HonestTestimonial key={index} {...testimonial} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="p-8 border-l-4 border-l-green-500">
          <div className="flex items-start space-x-4">
            <TrendingUp className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Estatísticas Honestas</h3>
              <div className="space-y-3 text-foreground">
                <p>• <strong>78%</strong> das alunas veem resultado perceptível em 3-4 semanas</p>
                <p>• <strong>23%</strong> precisam de ajustes na alimentação para resultados mais rápidos</p>
                <p>• <strong>95%</strong> concluem o protocolo de 30 dias</p>
                <p>• <strong>Tempo médio</strong> para primeiro resultado: 3,2 semanas</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-l-4 border-l-yellow-500">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Transparência Total</h3>
              <div className="space-y-3 text-foreground">
                <p>• <strong>5%</strong> não obtiveram resultado esperado</p>
                <p>• <strong>Principais fatores:</strong> inconsistência no treino (60%) e expectativas irreais (40%)</p>
                <p>• <strong>Reembolso garantido</strong> para quem seguiu corretamente</p>
                <p>• <strong>Suporte ativo</strong> para maximizar chances de sucesso</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-muted/30 border border-muted rounded-lg p-8 mb-12">
        <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
          Observação Importante
        </h3>
        <p className="text-foreground text-center text-lg leading-relaxed">
          "Nem todos os casos são iguais. Fatores como genética, idade, histórico de atividade 
          e consistência influenciam diretamente os resultados. O que garantimos é um método 
          tecnicamente correto e suporte para maximizar suas chances de sucesso."
        </p>
      </div>

      <div className="text-center">
        <Button 
          onClick={onNext}
          size="lg"
          className="px-8 py-4 text-lg"
        >
          Ver conteúdo completo do método
        </Button>
      </div>
    </div>
  );
};
