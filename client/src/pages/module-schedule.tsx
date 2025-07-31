import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isLoggedIn } from "@/lib/auth";
import { saveProgress, loadProgress } from "@/lib/checklist-storage";
import { ArrowLeft, Calendar, Target, CheckCircle, Clock, Trophy, Flame, Zap, Heart } from "lucide-react";

const scheduleData = [
  {
    week: 1,
    title: "DESPERTAR DOS GLÚTEOS",
    objective: "Ensinar seu corpo a sentir e ativar os glúteos corretamente",
    frequency: "5 dias",
    days: [
      {
        day: 1,
        title: "Ponte Ativa + Abdução de Quadril",
        exercises: [
          "Ponte Tradicional – 3x15",
          "Ponte com Elevação de Calcanhares – 3x12",
          "Abdução de Quadril Deitada – 3x20",
          "Isometria de Glúteo (15 seg contraindo) – 3x"
        ]
      },
      {
        day: 2,
        title: "Foco em Controle e Contração",
        exercises: [
          "Fire Hydrant Lento – 3x15",
          "Ponte com Marcha – 3x12",
          "Abdução com pausa de 2s – 3x15",
          "Prancha com contração glútea – 3x30 segundos"
        ]
      },
      {
        day: 3,
        title: "Descanso Ativo",
        exercises: [
          "Caminhada leve 20 minutos",
          "Alongamentos para lombar",
          "Alongamentos posterior de coxa",
          "Alongamentos para glúteos"
        ]
      },
      {
        day: 4,
        title: "Base e Estabilidade",
        exercises: [
          "Ponte Unilateral – 3x10 por perna",
          "Agachamento com pausa de 3 segundos – 3x12",
          "Glute Bridge com joelhos pressionando – 3x20",
          "Respiração profunda + contração – 5x10 segundos"
        ]
      },
      {
        day: 5,
        title: "Repetição com Foco Total",
        exercises: [
          "Refaça o treino do Dia 2",
          "Foque no tempo de execução",
          "2 segundos descendo",
          "1 segundo pausa, 2 subindo"
        ]
      }
    ]
  },
  {
    week: 2,
    title: "ESTÍMULO E EXPANSÃO",
    objective: "Aumentar o volume de trabalho nos glúteos. Aqui começa o crescimento real",
    frequency: "5 dias",
    days: [
      {
        day: 8,
        title: "Avanços e Pulsos",
        exercises: [
          "Agachamento com pulso final – 3x15",
          "Avanço Lento no Lugar – 3x10 por perna",
          "Ponte com elevação e contração – 3x12",
          "Fire Hydrant + Chute para Trás – 3x15"
        ]
      },
      {
        day: 9,
        title: "Isometria com Explosão",
        exercises: [
          "Ponte com pausa de 10s + 10 reps – 3x",
          "Agachamento + Elevação de calcanhares – 3x15",
          "Isometria de Abdução – 3x30 segundos",
          "Ponte com travesseiro entre joelhos – 3x20"
        ]
      },
      {
        day: 10,
        title: "Descanso Ativo",
        exercises: [
          "Alongamento com bola ou cadeira",
          "Mobilidade de quadril",
          "Caminhada leve",
          "Automassagem"
        ]
      },
      {
        day: 11,
        title: "Combinação Glúteo Médio + Máximo",
        exercises: [
          "Ponte unilateral com pausa – 3x10",
          "Fire Hydrant com elástico – 3x20",
          "Agachamento sumô com pausa – 3x15",
          "Prancha + Contração alternada – 3x40s"
        ]
      },
      {
        day: 12,
        title: "Repetição com Velocidade",
        exercises: [
          "Refazer treino do Dia 8",
          "Ritmo mais acelerado",
          "Manter controle",
          "Foco na qualidade"
        ]
      }
    ]
  },
  {
    week: 3,
    title: "DEFINIÇÃO E PROJEÇÃO",
    objective: "Começar a modelar, empinar e dar forma visível aos glúteos",
    frequency: "5 dias",
    days: [
      {
        day: 15,
        title: "Alta Intensidade",
        exercises: [
          "Agachamento Explosivo – 3x12",
          "Ponte com peso improvisado – 3x10",
          "Abdução + Isometria – 3x20",
          "Fire Hydrant com pausa – 3x15"
        ]
      },
      {
        day: 16,
        title: "Projeção Posterior",
        exercises: [
          "Ponte Unilateral com perna estendida – 3x12",
          "Chute de Trás + Contração – 3x15",
          "Prancha lateral com perna elevada – 3x30s",
          "Ponte com banda – 3x25"
        ]
      },
      {
        day: 17,
        title: "Descanso Ativo",
        exercises: [
          "Mobilidade de quadril",
          "Yoga leve",
          "Massagem caseira",
          "Hidratação intensa"
        ]
      },
      {
        day: 18,
        title: "Estímulo Contínuo + Desafio",
        exercises: [
          "3 rodadas seguidas sem descanso:",
          "Agachamento sumô",
          "Ponte isométrica",
          "Fire Hydrant + Abdução"
        ]
      },
      {
        day: 19,
        title: "Repetição com Intensidade",
        exercises: [
          "Repetir Dia 15",
          "Pausas maiores",
          "Intensidade máxima",
          "Foco total"
        ]
      }
    ]
  },
  {
    week: 4,
    title: "CONSOLIDAÇÃO MÁXIMA",
    objective: "Finalizar com glúteos visivelmente maiores, empinados e mais fortes",
    frequency: "6 dias",
    days: [
      {
        day: 22,
        title: "Superséries Explosivas",
        exercises: [
          "Ponte + Abdução – 3 séries",
          "Agachamento Explosivo + Fire Hydrant – 3 séries",
          "Avanço alternado + Ponte com pausa – 3 séries",
          "Prancha + Contração – 3 séries"
        ]
      },
      {
        day: 23,
        title: "Técnica Final",
        exercises: [
          "Todos os exercícios do Dia 22",
          "Com peso improvisado",
          "Sacola com arroz ou mochila",
          "Toalha molhada sobre barriga"
        ]
      },
      {
        day: 25,
        title: "Melhor Desempenho",
        exercises: [
          "Repetir o treino que mais",
          "te fez sentir os glúteos",
          "Máxima intensidade",
          "Foco na sensação"
        ]
      },
      {
        day: 26,
        title: "Circuito Final",
        exercises: [
          "Agachamento + Ponte + Fire Hydrant",
          "3x sem descanso",
          "Circuito completo",
          "Resistência total"
        ]
      },
      {
        day: 27,
        title: "Fire Hydrant + Isometria",
        exercises: [
          "Fire Hydrant intenso",
          "Isometria longa",
          "Super Ponte Final",
          "Máxima contração"
        ]
      },
      {
        day: 30,
        title: "Treino de Celebração",
        exercises: [
          "Todos os exercícios favoritos",
          "Avaliação final",
          "Fotos de progresso",
          "Celebração da conquista!"
        ]
      }
    ]
  }
];

const techniques = [
  {
    name: "Isometria",
    description: "Pausar o movimento na parte de maior esforço por 5 a 10 segundos"
  },
  {
    name: "Rest-Pause", 
    description: "Ao terminar uma série, descansar 10 segundos e fazer +5 reps"
  },
  {
    name: "Supersérie",
    description: "Combinar dois exercícios seguidos, sem pausa"
  },
  {
    name: "Velocidade Controlada",
    description: "2s descida, 1s pausa, 2s subida"
  }
];

export default function ModuleSchedule() {
  const [, setLocation] = useLocation();
  const [activeWeek, setActiveWeek] = useState(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation("/");
      return;
    }

    // Load saved progress on component mount
    const savedProgress = loadProgress();
    const completedSet = new Set<number>();
    
    Object.entries(savedProgress).forEach(([key, value]) => {
      if (value && key.startsWith('module-schedule-day-')) {
        const dayNumber = parseInt(key.replace('module-schedule-day-', ''));
        if (!isNaN(dayNumber)) {
          completedSet.add(dayNumber);
        }
      }
    });
    
    setCompletedDays(completedSet);
  }, [setLocation]);

  const handleBack = () => {
    setLocation("/dashboard");
  };

  const toggleDayComplete = (day: number) => {
    const newCompleted = new Set(completedDays);
    let isCompleted = false;
    
    if (newCompleted.has(day)) {
      newCompleted.delete(day);
      isCompleted = false;
    } else {
      newCompleted.add(day);
      isCompleted = true;
    }
    
    setCompletedDays(newCompleted);
    
    // Auto-save progress
    const fullKey = `module-schedule-day-${day}`;
    const currentProgress = loadProgress();
    currentProgress[fullKey] = isCompleted;
    saveProgress(currentProgress);
  };

  const currentWeek = scheduleData[activeWeek - 1];

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
              <h1 className="font-bold text-foreground">Cronograma de Treinos</h1>
              <p className="text-muted-foreground text-sm">Plano Detalhado 30 Dias</p>
            </div>
            <div className="w-9" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Introduction */}
        <Card className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white shadow-xl border-0">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 mr-3 text-orange-100" />
              <div>
                <h2 className="text-2xl font-bold text-white">Cronograma Completo</h2>
                <p className="text-orange-100">Glúteos Maiores, Empinados e Definidos</p>
              </div>
            </div>
            <p className="text-orange-100 mb-4">
              Um sistema enxuto de 30 dias com treinos 100% focados nos glúteos, apenas 15 minutos por dia.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center border border-white/30">
                <Clock className="w-6 h-6 mx-auto mb-2 text-orange-100" />
                <p className="text-sm font-medium text-white">15-20 min</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center border border-white/30">
                <Target className="w-6 h-6 mx-auto mb-2 text-orange-100" />
                <p className="text-sm font-medium text-white">Sem Academia</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center border border-white/30">
                <Heart className="w-6 h-6 mx-auto mb-2 text-orange-100" />
                <p className="text-sm font-medium text-white">Casa</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center border border-white/30">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-orange-100" />
                <p className="text-sm font-medium text-white">Resultados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Week Navigation */}
        <Card className="border-orange-200 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Estrutura do Programa (30 Dias)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {scheduleData.map((week) => (
                <Button
                  key={week.week}
                  variant={activeWeek === week.week ? "default" : "outline"}
                  onClick={() => setActiveWeek(week.week)}
                  className={`h-auto p-4 flex flex-col text-left transition-all duration-200 ${
                    activeWeek === week.week 
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg" 
                      : "border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
                  }`}
                >
                  <span className="text-lg font-bold mb-1">Semana {week.week}</span>
                  <span className="text-xs mb-2 opacity-90">{week.title}</span>
                  <span className="text-xs opacity-75">{week.frequency}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Week Details */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-orange-600 mb-2">
                Semana {currentWeek.week} - {currentWeek.title}
              </h3>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Target className="w-5 h-5 text-orange-500 mr-2" />
                  Objetivo:
                </h4>
                <p className="text-gray-600">{currentWeek.objective}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-orange-500" />
                <span>Frequência: {currentWeek.frequency}</span>
              </div>
            </div>

            {/* Days */}
            <div className="space-y-4">
              {currentWeek.days.map((dayData, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          Dia {dayData.day}: {dayData.title}
                        </h4>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleDayComplete(dayData.day)}
                        className={completedDays.has(dayData.day) ? "text-orange-500" : "text-gray-400 hover:text-orange-500"}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {dayData.exercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className="flex items-center p-2 bg-orange-50 rounded border border-orange-100">
                          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-xs font-medium">{exerciseIndex + 1}</span>
                          </div>
                          <span className="text-gray-700">{exercise}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Techniques */}
        <Card className="border-orange-200 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <Zap className="w-6 h-6 text-orange-500 mr-3" />
              Técnicas de Intensificação
            </h3>
            <p className="text-gray-600 mb-4">
              Essas técnicas são usadas nas semanas 2, 3 e 4:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {techniques.map((technique, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{technique.name}</h4>
                  <p className="text-gray-600 text-sm">{technique.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success Tips */}
        <Card className="border-orange-200 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <Trophy className="w-6 h-6 text-orange-500 mr-3" />
              Dicas Para Executar com Sucesso
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Treine sempre no mesmo horário para criar hábito",
                "Beba água antes, durante e após o treino",
                "Treine com música que te empolga",
                "Use roupas confortáveis que te façam se sentir bonita",
                "Tire fotos semanais e se olhe no espelho com orgulho",
                "Mesmo sem vontade: FAÇA. Glúteos não crescem com desculpa"
              ].map((tip, index) => (
                <div key={index} className="flex items-start p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Final Message */}
        <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-300 shadow-lg">
          <CardContent className="p-6 text-center">
            <Flame className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Não Existe Mágica. Existe Método + Execução.
            </h3>
            <p className="text-gray-600 mb-4">
              "Faça o simples, faça com verdade e o corpo responde."
            </p>
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg shadow-md">
              <Trophy className="w-5 h-5 mr-2" />
              <span className="font-semibold">Você Tem o Plano. Agora Execute!</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}