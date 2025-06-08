
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Shield, Heart, TrendingUp, Clock } from 'lucide-react';

interface Step7Props {
  onNext: () => void;
}

export const Step7: React.FC<Step7Props> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Meu Compromisso com seu Resultado
        </h1>
        <p className="text-xl text-muted-foreground">
          Garantia real baseada na minha confiança no método
        </p>
      </div>

      <Card className="p-8 mb-12 border-l-4 border-l-green-500">
        <div className="flex items-start space-x-4">
          <Shield className="w-12 h-12 text-green-600 mt-1" />
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              GARANTIA DE 30 DIAS - SEM LETRINHAS MIÚDAS
            </h3>
            <div className="space-y-4 text-foreground">
              <p className="text-lg"><strong>Se você:</strong></p>
              <div className="ml-4 space-y-2">
                <p>• Seguir o protocolo por 30 dias consecutivos</p>
                <p>• Registrar sua evolução na planilha fornecida</p>
                <p>• E não obtiver resultado perceptível</p>
              </div>
              <p className="text-xl font-semibold text-green-700 mt-6">
                Eu devolvo 100% do seu investimento, sem perguntas.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <Heart className="w-8 h-8 text-primary mt-1" />
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Por que ofereço essa garantia?
              </h4>
              <p className="text-foreground leading-relaxed">
                Porque testei o método com centenas de alunas antes de disponibilizar. 
                Tenho dados reais que comprovam a eficácia quando aplicado corretamente. 
                Minha reputação depende dos seus resultados.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <Clock className="w-8 h-8 text-secondary mt-1" />
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Suporte Real Incluído
              </h4>
              <div className="space-y-2 text-foreground">
                <p>• Resposta a dúvidas técnicas em até 24h</p>
                <p>• Ajustes no protocolo se necessário</p>
                <p>• Acesso vitalício às atualizações</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 mb-12 bg-secondary/5 border-secondary/20">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Transparência Financeira
          </h3>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            Este é meu trabalho principal. Vivo dos resultados que entrego. 
            Por isso, meu incentivo é que você tenha sucesso e recomende para outras pessoas.
          </p>
          <div className="bg-background rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-3">Histórico de Reembolsos (últimos 12 meses)</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4,2%</div>
                <p className="text-muted-foreground">Taxa de reembolsos solicitados</p>
              </div>
              <div className="space-y-2 text-sm text-foreground">
                <p><strong>Principais motivos:</strong></p>
                <p>• Falta de tempo para treinar (78%)</p>
                <p>• Expectativas irrealistas (22%)</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 mb-12">
        <div className="flex items-start space-x-4">
          <TrendingUp className="w-8 h-8 text-green-600 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Meu Compromisso Pessoal
            </h3>
            <div className="space-y-3 text-foreground">
              <p>• Estou disponível para esclarecer dúvidas técnicas</p>
              <p>• Monitoro os resultados e ajusto o método quando necessário</p>
              <p>• Celebro cada conquista das minhas alunas</p>
              <p>• Assumo responsabilidade pelo seu sucesso no método</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={onNext}
          size="lg"
          className="px-8 py-4 text-lg"
        >
          Finalizar análise
        </Button>
      </div>
    </div>
  );
};
