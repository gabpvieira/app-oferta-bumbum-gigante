
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CheckCircle, ArrowRight, Heart } from 'lucide-react';

interface Step8Props {
  userProfile: any;
}

export const Step8: React.FC<Step8Props> = ({ userProfile }) => {
  const handlePurchase = () => {
    // Aqui seria integrado com a plataforma de pagamento
    console.log('Iniciando processo de compra...');
    window.open('https://pay.hotmart.com/example', '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Você tem as Informações para Decidir
        </h1>
        <p className="text-xl text-muted-foreground">
          Recapitulando o que conversamos
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="p-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            O que você sabe sobre o método:
          </h3>
          <div className="space-y-3">
            {[
              'Base científica em hipertrofia de glúteos',
              'Protocolo testado com mais de 200 alunas',
              '78% veem resultado em 3-4 semanas',
              'Progressão estruturada para 30 dias',
              'Suporte técnico incluído',
              '30 dias para testar com garantia real'
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            O que você recebe:
          </h3>
          <div className="space-y-3">
            {[
              'Protocolo completo (120 exercícios)',
              'Manual técnico (47 páginas)',
              'Guia nutricional prático',
              'Planilhas de controle',
              'Suporte por 30 dias',
              'Atualizações vitalícias'
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Investimento Total
          </h3>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className="text-4xl font-bold text-primary">R$ 47</span>
          </div>
          <p className="text-muted-foreground">
            Equivale a R$ 1,56 por dia durante 30 dias
          </p>
        </div>
      </div>

      <Card className="p-8 mb-12 bg-background border border-border">
        <div className="flex items-start space-x-4">
          <Heart className="w-8 h-8 text-primary mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              A Decisão É Sua
            </h3>
            <p className="text-foreground leading-relaxed mb-6">
              Não há timer correndo ou vagas limitadas. O método estará disponível 
              quando você decidir que é o momento certo.
            </p>
            <div className="space-y-3 text-foreground">
              <p><strong>Se você está convencida de que:</strong></p>
              <div className="ml-4 space-y-2">
                <p>• O método faz sentido para você</p>
                <p>• Tem 15 minutos diários disponíveis</p>
                <p>• Está disposta a seguir por 30 dias</p>
                <p>• Quer um resultado baseado em ciência</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-center mb-8">
        <Button 
          onClick={handlePurchase}
          size="lg"
          className="px-12 py-4 text-lg mb-6"
        >
          Quero começar o método
        </Button>
        
        <p className="text-muted-foreground text-sm">
          Pagamento 100% seguro • Garantia de 30 dias
        </p>
      </div>

      <div className="text-center bg-muted/30 rounded-lg p-6">
        <p className="text-foreground">
          <strong>Se ainda tem dúvidas ou não é o momento certo, tudo bem.</strong><br />
          Guarde as informações e volte quando se sentir preparada.
        </p>
      </div>
    </div>
  );
};
