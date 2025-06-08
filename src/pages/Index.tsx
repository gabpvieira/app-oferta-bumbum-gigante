
import React from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { CheckCircle, Star, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleStartFunnel = () => {
    navigate('/funnel');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Treino de Glúteos que Realmente Funciona
            </h1>
            <p className="text-2xl text-muted-foreground mb-8">
              Um método direto, baseado em fisiologia, para desenvolver glúteos em casa
            </p>
            
            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-foreground">Professora de Educação Física</h3>
                  <p className="text-muted-foreground">8 anos de experiência • CREF Ativo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Introduction Text */}
          <div className="mb-16">
            <Card className="p-8 text-center">
              <p className="text-lg text-foreground leading-relaxed mb-8">
                Sou <strong>Ana Carolina Silva</strong>, formada em Educação Física há 8 anos. 
                Desenvolvi este protocolo depois de estudar centenas de pesquisas sobre hipertrofia 
                de glúteos e testar com mais de 200 alunas.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    O que você vai encontrar aqui:
                  </h3>
                  <div className="space-y-3 text-left">
                    {[
                      'Exercícios baseados em biomecânica real',
                      'Progressão lógica de 30 dias',
                      'Adaptações para iniciantes e intermediárias',
                      'Resultados honestos: o que esperar e quando'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    O que NÃO é:
                  </h3>
                  <div className="space-y-3 text-left">
                    {[
                      'Milagre de 7 dias',
                      'Fórmula secreta descoberta por acaso',
                      'Método que funciona para 100% das pessoas',
                      'Promessa de resultado sem esforço'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-red-100 border-2 border-red-300 mt-0.5 flex-shrink-0" />
                        <p className="text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Credibility Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">200+ Alunas</h4>
              <p className="text-sm text-muted-foreground">Método testado e validado em ambiente real</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Base Científica</h4>
              <p className="text-sm text-muted-foreground">Fundamentado em pesquisas de hipertrofia</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Resultados Reais</h4>
              <p className="text-sm text-muted-foreground">78% das alunas veem resultado em 3-4 semanas</p>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button 
              onClick={handleStartFunnel}
              size="lg"
              className="px-12 py-4 text-xl"
            >
              Ver como funciona o método
            </Button>
            
            <p className="text-muted-foreground mt-4">
              Análise completa • Sem compromisso • 100% educativo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
