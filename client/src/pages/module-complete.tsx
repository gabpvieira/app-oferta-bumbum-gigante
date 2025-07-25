import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isLoggedIn, logout } from "@/lib/auth";
import { ArrowLeft, Clock, Target, CheckCircle, Calendar, Trophy, Flame, Heart, Star } from "lucide-react";

const weekData = [
  {
    week: 1,
    title: "Ativando a Base",
    objective: "Ensinar seus glúteos a acordarem. Criar consciência corporal e ativação neural.",
    exercises: [
      "Glute Bridge (Ponte de Glúteo) – 3x15",
      "Abdução de Quadril deitada – 3x20", 
      "Elevação de Quadril Unilateral – 3x10 por perna",
      "Prancha com Squeeze de Glúteo – 3x30 segundos"
    ],
    diet: [
      "Elimine industrializados e ultraprocessados",
      "Priorize proteínas (ovos, frango, lentilha)",
      "Folhas verdes e carboidratos bons",
      "Beba 2L de água por dia"
    ],
    tip: "Faça os treinos sempre no mesmo horário. Crie o gatilho mental: 'esse é meu momento de cuidar do meu corpo'."
  },
  {
    week: 2,
    title: "Expansão e Crescimento", 
    objective: "Começar a desafiar seus glúteos com volume e técnica, ativando a hipertrofia.",
    exercises: [
      "Agachamento Isométrico (encostada na parede) – 3x30 segundos",
      "Avanço Alternado (passada no lugar) – 3x10 por perna",
      "Ponte com Elevação de Pernas – 3x15",
      "Fire Hydrant (Cachorrinho) – 3x20 por perna"
    ],
    diet: [
      "Inclua 1 shake proteico por dia",
      "Reduza o açúcar ao máximo",
      "Troque por frutas doces naturais",
      "Mantenha a hidratação"
    ],
    tip: "Adicione 'Pausa de Contração' de 3 segundos no final de cada movimento."
  },
  {
    week: 3,
    title: "Definição e Empinamento",
    objective: "Modelar e projetar os glúteos, criando uma forma mais empinada e harmônica.",
    exercises: [
      "Agachamento Pulsante (sem subir tudo) – 3x20",
      "Ponte com Elástico – 3x20",
      "Extensão de Quadril com Toque de Pé – 3x12 por lado",
      "Escada Imaginária – 3x40 segundos"
    ],
    diet: [
      "Foque em alimentos termogênicos",
      "Corte refrigerantes e álcool",
      "Coma frutas antes do treino",
      "Gengibre, pimenta, chá verde"
    ],
    tip: "Rest-pause: ao terminar cada série, descanse 10 segundos e faça +5 repetições extras."
  },
  {
    week: 4,
    title: "Consolidação e Intensificação",
    objective: "Maximizar os resultados visuais, projetar o bumbum e fixar o hábito.",
    exercises: [
      "Super Ponte com Isometria + Pulsos – 3x10 + 20 seg",
      "Agachamento Explosivo (pulando leve) – 3x12",
      "Ponte Unilateral com Elevação – 3x10 por perna",
      "Fire Hydrant + Chute para Trás – 3x15 cada"
    ],
    diet: [
      "Alimentação limpa e recuperação muscular",
      "Pós-treino: banana com canela",
      "Água de coco ou ovo cozido",
      "Evite comer tarde à noite"
    ],
    tip: "Supersérie: combine dois exercícios sem descanso (ex: Ponte + Fire Hydrant)."
  }
];

const postureGuide = [
  {
    title: "Postura Confiante",
    tips: [
      "Ombros para trás, peito aberto",
      "Barriga levemente contraída", 
      "Caminhe sentindo os glúteos ativados"
    ]
  },
  {
    title: "Looks que Valorizam",
    tips: [
      "Legging de cós alto",
      "Shorts com corte em 'V'",
      "Vestidos colados com caimento leve",
      "Cores escuras na parte inferior"
    ]
  }
];

export default function ModuleComplete() {
  const [, setLocation] = useLocation();
  const [activeWeek, setActiveWeek] = useState(1);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation("/");
      return;
    }
  }, [setLocation]);

  const handleBack = () => {
    setLocation("/dashboard");
  };

  const toggleCheck = (item: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(item)) {
      newChecked.delete(item);
    } else {
      newChecked.add(item);
    }
    setCheckedItems(newChecked);
  };

  const currentWeek = weekData[activeWeek - 1];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="font-bold text-foreground">Módulo Completo</h1>
              <p className="text-muted-foreground text-sm">Projeto Glúteo Gigante™</p>
            </div>
            <div className="w-9" /> {/* Spacer */}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Introduction */}
        <Card className="gradient-bg text-white">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Flame className="w-8 h-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Guia Completo</h2>
                <p className="text-white/90">Glúteos Grandes e Definidos em 30 Dias</p>
              </div>
            </div>
            <p className="text-white/90 mb-4">
              Um plano real, prático e testado para transformar seu corpo em 30 dias — sem academia, sem suplementos, sem enrolação.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/20 rounded-lg p-3">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">15 min/dia</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Target className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">100% Focado</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">30 Dias</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <Trophy className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Resultados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Week Navigation */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-6 h-6 text-primary mr-3" />
              Cronograma Semanal
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {weekData.map((week) => (
                <Button
                  key={week.week}
                  variant={activeWeek === week.week ? "default" : "outline"}
                  onClick={() => setActiveWeek(week.week)}
                  className="h-auto p-4 flex flex-col"
                >
                  <span className="text-lg font-bold">Semana {week.week}</span>
                  <span className="text-xs">{week.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Week Content */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Semana {currentWeek.week} - {currentWeek.title}
              </h3>
              <div className="bg-primary/10 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center">
                  <Target className="w-5 h-5 text-primary mr-2" />
                  Objetivo da Semana:
                </h4>
                <p className="text-muted-foreground">{currentWeek.objective}</p>
              </div>
            </div>

            {/* Exercises */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <Trophy className="w-6 h-6 text-secondary mr-3" />
                Treino Diário (15 minutos)
              </h4>
              <div className="space-y-3">
                {currentWeek.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-center p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{exercise}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCheck(`exercise-${activeWeek}-${index}`)}
                      className={checkedItems.has(`exercise-${activeWeek}-${index}`) ? "text-secondary" : ""}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Diet */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <Heart className="w-6 h-6 text-accent mr-3" />
                Mini-Dieta da Semana
              </h4>
              <div className="space-y-3">
                {currentWeek.diet.map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-accent/10 rounded-lg">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
              <h4 className="font-semibold text-foreground mb-2 flex items-center">
                <Star className="w-5 h-5 text-primary mr-2" />
                Dica de Ouro:
              </h4>
              <p className="text-muted-foreground">{currentWeek.tip}</p>
            </div>
          </CardContent>
        </Card>

        {/* Posture Guide */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Star className="w-6 h-6 text-accent mr-3" />
              Guia de Postura e Estilo
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {postureGuide.map((guide, index) => (
                <div key={index} className="bg-muted/50 rounded-xl p-4">
                  <h4 className="font-semibold text-foreground mb-3">{guide.title}</h4>
                  <ul className="space-y-2">
                    {guide.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monitoring */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Target className="w-6 h-6 text-primary mr-3" />
              Monitoramento Semanal
            </h3>
            <div className="space-y-3">
              {[
                "Fiz os treinos no mínimo 4x por semana",
                "Mantive a alimentação alinhada", 
                "Hidratei com no mínimo 2L de água",
                "Fiz meu ritual de autoestima"
              ].map((item, index) => (
                <div key={index} className="flex items-center p-3 border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCheck(`monitoring-${index}`)}
                    className={`mr-3 ${checkedItems.has(`monitoring-${index}`) ? "text-secondary" : ""}`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </Button>
                  <p className="text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Final Message */}
        <Card className="bg-gradient-to-r from-secondary/10 to-primary/10">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Sua Jornada Está Só Começando!
            </h3>
            <p className="text-muted-foreground mb-4">
              "Você não precisa da academia. Você não precisa de ninguém aprovando seu corpo. 
              Você só precisa fazer o básico bem feito, todos os dias."
            </p>
            <div className="flex items-center justify-center">
              <Flame className="w-6 h-6 text-primary mr-2" />
              <span className="font-semibold text-foreground">O Projeto Glúteo Gigante™ é seu!</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}