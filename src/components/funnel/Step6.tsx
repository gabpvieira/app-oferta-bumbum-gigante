
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Play, FileText, Calendar, Users, Apple, Clock } from 'lucide-react';

interface Step6Props {
  onNext: () => void;
}

export const Step6: React.FC<Step6Props> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          DNA do Bumbum Perfeito - Conteúdo Completo
        </h1>
        <p className="text-xl text-muted-foreground">
          Tudo que você recebe para implementar o método corretamente
        </p>
      </div>

      <div className="space-y-8 mb-12">
        <Card className="p-8 border-l-4 border-l-primary">
          <div className="flex items-start space-x-4">
            <Play className="w-8 h-8 text-primary mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Protocolo de 30 Dias - DNA do Bumbum Perfeito
              </h3>
              <div className="space-y-3 text-foreground">
                <p>• <strong>120 exercícios progressivos</strong> em vídeo HD com demonstração completa</p>
                <p>• <strong>Manual técnico</strong> com 47 páginas de orientações detalhadas</p>
                <p>• <strong>Planilha de controle</strong> para acompanhar sua evolução diária</p>
                <p>• <strong>Adaptações para 3 níveis:</strong> iniciante, intermediário e avançado</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-l-4 border-l-secondary">
          <div className="flex items-start space-x-4">
            <Apple className="w-8 h-8 text-secondary mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Mini Guia Nutricional
              </h3>
              <div className="space-y-3 text-foreground">
                <p>• <strong>Não é dieta restritiva</strong> - foco em otimização, não privação</p>
                <p>• <strong>Nutrientes específicos</strong> para recuperação muscular</p>
                <p>• <strong>20 opções de refeições</strong> práticas e saborosas</p>
                <p>• <strong>Lista de compras</strong> organizada por seções do mercado</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-l-4 border-l-green-500">
          <div className="flex items-start space-x-4">
            <Calendar className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Cronograma Diário Detalhado
              </h3>
              <div className="space-y-3 text-foreground">
                <p>• <strong>Planejamento dia a dia</strong> para os 30 dias completos</p>
                <p>• <strong>Tempo estimado</strong> para cada treino (15-25 minutos)</p>
                <p>• <strong>Sistema de registro</strong> de evolução e sensações</p>
                <p>• <strong>Dicas motivacionais</strong> para manter a consistência</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-l-4 border-l-purple-500">
          <div className="flex items-start space-x-4">
            <Users className="w-8 h-8 text-purple-600 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Suporte e Acompanhamento
              </h3>
              <div className="space-y-3 text-foreground">
                <p>• <strong>Acesso ao grupo privado</strong> de alunas (opcional)</p>
                <p>• <strong>Suporte técnico direto</strong> para dúvidas de execução</p>
                <p>• <strong>Atualizações do método</strong> incluídas para sempre</p>
                <p>• <strong>Garantia de 30 dias</strong> para testar sem riscos</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8 mb-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Valor Total do Pacote Completo
          </h3>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className="text-5xl font-bold text-primary">R$ 47</span>
          </div>
          <p className="text-lg text-muted-foreground">
            Equivale a R$ 1,56 por dia durante 30 dias
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">Conteúdo Completo</h4>
          <p className="text-sm text-muted-foreground">Tudo necessário para implementar o método</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-secondary" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">Acesso Vitalício</h4>
          <p className="text-sm text-muted-foreground">Para sempre, incluindo atualizações</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">Suporte Real</h4>
          <p className="text-sm text-muted-foreground">Acompanhamento técnico personalizado</p>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={onNext}
          size="lg"
          className="px-8 py-4 text-lg"
        >
          Ver garantia e compromisso
        </Button>
      </div>
    </div>
  );
};
