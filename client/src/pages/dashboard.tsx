import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isLoggedIn, getCurrentUser, logout } from "@/lib/auth";
import { initializeProgress, calculateProgress } from "@/lib/progress";
import ProgressBar from "@/components/ProgressBar";
import ModuleCard from "@/components/ModuleCard";

import { Flame, LogOut, Trophy, Star, Headphones, MessageCircle, Users, Crown, Heart, Lock, UserPlus } from "lucide-react";

const moduleData = [
  {
    id: 1,
    title: "Módulo 1: Ativação Muscular Diária",
    description: "A transformação começa com a ativação dos glúteos",
    duration: "15 minutos por dia",
    icon: "fa-dumbbell",
    iconBg: "bg-primary",
    lessons: [
      {
        id: "1-1",
        number: 1,
        title: "Exercícios de Ativação Básica",
        description: "Aprenda os movimentos fundamentais para acordar seus glúteos. Começamos com exercícios simples que preparam seus músculos para treinos mais intensos.",
        example: {
          title: "Exemplo Prático",
          content: "Agachamento na Cadeira: Use uma cadeira como apoio. Desça lentamente até quase tocar o assento, mantenha por 2 segundos e suba. Sinta a contração no glúteo durante todo o movimento."
        },
        tip: {
          title: "Dica Importante",
          content: "Mantenha a postura correta: coluna reta, ombros para trás e core contraído. A qualidade do movimento é mais importante que a quantidade.",
          type: "important" as const
        }
      },
      {
        id: "1-2",
        number: 2,
        title: "Ponte Glútea Perfeita",
        description: "Domine o exercício mais eficaz para ativação dos glúteos. A ponte é a base de todo desenvolvimento posterior.",
        example: {
          title: "Técnica Correta",
          content: "Deite de costas, joelhos dobrados, pés apoiados no chão. Contraia os glúteos e eleve o quadril formando uma linha reta do joelho ao ombro. Segure por 3 segundos."
        },
        tip: {
          title: "Evite Este Erro",
          content: "Não arqueie demais as costas. O movimento deve partir dos glúteos, não da lombar. Mantenha o core ativo durante todo o exercício.",
          type: "warning" as const
        }
      },
      {
        id: "1-3",
        number: 3,
        title: "Caminhada Lateral Ativadora",
        description: "Ative os músculos laterais dos glúteos com este movimento simples mas poderoso. Perfeito para moldar e definir.",
        example: {
          title: "Como Fazer",
          content: "Em pé, pés paralelos, dê um passo largo para o lado mantendo o joelho alinhado com o pé. Volte à posição inicial. Faça 10 repetições para cada lado."
        },
        tip: {
          title: "Benefício Extra",
          content: "Este exercício também fortalece os músculos estabilizadores, melhorando seu equilíbrio e postura no dia a dia.",
          type: "extra" as const
        }
      }
    ],
    summary: {
      content: "Parabéns! Você aprendeu os três exercícios fundamentais para ativar seus glúteos. Estes movimentos são a base de toda sua transformação.",
      nextSteps: "Pratique estes exercícios por 3 dias consecutivos antes de avançar para o Módulo 2. Seu corpo precisa se adaptar aos novos estímulos."
    }
  },
  {
    id: 2,
    title: "Módulo 2: Mini-Dieta Potencializadora",
    description: "Alimentação estratégica para resultados acelerados",
    duration: "Nutrição focada em resultados",
    icon: "fa-utensils",
    iconBg: "bg-secondary",
    lessons: [
      {
        id: "2-1",
        number: 1,
        title: "Café da Manhã Energizante",
        description: "Comece o dia com energia e nutrientes que apoiam o desenvolvimento muscular.",
        example: {
          title: "Cardápio Ideal",
          content: "2 ovos mexidos + 1 fatia de pão integral + 1 banana com 1 colher de sopa de pasta de amendoim + água com limão."
        },
        tip: {
          title: "Dica Nutricional",
          content: "As proteínas do ovo e a gordura boa do amendoim fornecem energia sustentada para seus treinos.",
          type: "important" as const
        }
      },
      {
        id: "2-2",
        number: 2,
        title: "Almoço Nutritivo",
        description: "Combine proteínas, carboidratos complexos e vegetais para otimizar a recuperação muscular.",
        example: {
          title: "Prato Balanceado",
          content: "150g de proteína (frango, peixe ou leguminosas) + salada colorida com azeite + 1 porção de carboidrato complexo (arroz integral, batata doce)."
        },
        tip: {
          title: "Hidratação",
          content: "Beba pelo menos 2 litros de água por dia. A hidratação adequada melhora a recuperação muscular e potencializa os resultados.",
          type: "extra" as const
        }
      },
      {
        id: "2-3",
        number: 3,
        title: "Jantar Leve",
        description: "Termine o dia com uma refeição leve que promove recuperação durante o sono.",
        example: {
          title: "Sugestão de Jantar",
          content: "Sopa de legumes com proteína + salada verde com grãos + chá relaxante antes de dormir."
        },
        tip: {
          title: "Sono Reparador",
          content: "Um jantar leve melhora a qualidade do sono, fundamental para o crescimento muscular.",
          type: "important" as const
        }
      }
    ],
    summary: {
      content: "Você aprendeu como potencializar seus resultados com uma alimentação inteligente, sem dietas restritivas.",
      nextSteps: "Implemente gradualmente essas mudanças alimentares. Pequenas mudanças consistentes geram grandes resultados."
    }
  },
  {
    id: 3,
    title: "Módulo 3: Segredos de Postura e Estilo",
    description: "Valorize sua silhueta mesmo durante a transformação",
    duration: "Confiança e autoestima",
    icon: "fa-star",
    iconBg: "bg-accent",
    lessons: [
      {
        id: "3-1",
        number: 1,
        title: "Postura que Transforma",
        description: "Uma boa postura pode fazer você parecer mais confiante e realçar suas curvas instantaneamente.",
        example: {
          title: "Técnica dos 3 Pontos",
          content: "1. Ombros para trás e relaxados, 2. Core levemente contraído, 3. Quadril levemente projetado."
        },
        tip: {
          title: "Pratica Diária",
          content: "Pratique essa postura várias vezes ao dia até se tornar natural. Use lembretes no celular.",
          type: "important" as const
        }
      },
      {
        id: "3-2",
        number: 2,
        title: "Roupas Estratégicas",
        description: "Escolhas inteligentes no guarda-roupa podem realçar seus pontos fortes.",
        example: {
          title: "Dicas de Styling",
          content: "Cintura marcada valoriza a silhueta, calças de cintura alta alongam as pernas, cores escuras emagrecem, cores claras destacam."
        },
        tip: {
          title: "Autoconfiança",
          content: "Vista-se para si mesma. Quando você se sente bem com suas roupas, sua confiança transparecer naturalmente.",
          type: "extra" as const
        }
      },
      {
        id: "3-3",
        number: 3,
        title: "Mindset de Sucesso",
        description: "Desenvolva a mentalidade necessária para manter a motivação durante toda a jornada.",
        example: {
          title: "Afirmações Positivas",
          content: "Eu estou me transformando todos os dias, Meu corpo responde positivamente aos cuidados que tenho com ele, Eu mereço me sentir linda e confiante."
        },
        tip: {
          title: "Celebre Pequenas Vitórias",
          content: "Comemore cada progresso, por menor que seja. Cada dia de treino é uma vitória!",
          type: "important" as const
        }
      }
    ],
    summary: {
      content: "Você descobriu como valorizar seu corpo e desenvolver uma mentalidade positiva para sua transformação.",
      nextSteps: "Continue aplicando essas técnicas diariamente. A transformação física e mental andam juntas."
    }
  }
];

const achievements = [
  {
    id: "first-access",
    title: "Primeiro Acesso",
    description: "Em breve...",
    icon: "user-plus",
    unlocked: true
  },
  {
    id: "first-week",
    title: "Primeira Semana",
    description: "Em breve...",
    icon: "dumbbell",
    unlocked: false
  },
  {
    id: "half-month",
    title: "15 Dias",
    description: "Meta de meio mês",
    icon: "medal",
    unlocked: false
  },
  {
    id: "transformation",
    title: "30 Dias",
    description: "Transformação completa",
    icon: "crown",
    unlocked: false
  }
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(calculateProgress());
  const userEmail = getCurrentUser();

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation("/");
      return;
    }
    
    initializeProgress();
    setProgress(calculateProgress());
  }, [setLocation]);

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleProgressUpdate = () => {
    setProgress(calculateProgress());
  };

  const displayEmail = userEmail ? userEmail.split('@')[0] + '@projeto...' : '';

  return (
    <div className="min-h-screen min-h-[100vh] min-h-[100dvh] bg-background">
      {/* Mobile Header */}
      <header className="bg-card shadow-sm sticky top-0 z-50 mobile-scroll">
        <div className="mobile-container py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-primary rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <Flame className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground text-responsive-base">Glúteo Gigante™</h1>
                <p className="text-muted-foreground text-xs">Área de Membros</p>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">Bem-vinda!</p>
                <p className="text-xs text-muted-foreground truncate max-w-[120px]">{displayEmail}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="mobile-button"
              >
                <LogOut className="w-3 sm:w-4 h-3 sm:h-4" />
                <span className="sr-only">Sair</span>
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <ProgressBar className="mt-3 sm:mt-4" />
        </div>
      </header>

      <main className="mobile-container py-4 sm:py-6 space-y-6 sm:space-y-8 pb-safe-bottom">
        {/* Welcome Section */}
        <section className="gradient-bg rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-responsive-xl font-bold mb-2 flex items-center flex-wrap">
                Bem-vinda ao Projeto Glúteo Gigante™! 
                <Flame className="w-5 sm:w-6 h-5 sm:h-6 ml-2" />
              </h2>
              <p className="text-white/90 mb-3 sm:mb-4 text-responsive-sm">
                Estamos animados para ajudá-la a alcançar o bumbum dos seus sonhos em apenas 30 dias!
              </p>
              <div className="flex items-center">
                <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-accent mr-2" />
                <span className="font-medium text-responsive-sm">Sua transformação começa agora!</span>
              </div>
            </div>
            {/* Motivational graphic */}
            <div className="hidden sm:block">
              <div className="w-16 sm:w-24 h-16 sm:h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Flame className="w-6 sm:w-8 h-6 sm:h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Achievement Section */}
        <Card className="animate-slide-up glass-effect overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-responsive-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center">
              <Trophy className="w-5 sm:w-6 h-5 sm:h-6 text-accent mr-2 sm:mr-3" />
              Suas Conquistas
            </h3>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Achievement 1 - Primeiro Acesso (Unlocked) */}
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] touch-target">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <UserPlus className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-responsive-sm mb-1 sm:mb-2">Conquistado!</h4>
                  <p className="text-white/90 text-xs sm:text-sm font-medium">Primeiro Acesso</p>
                </CardContent>
              </Card>

              {/* Achievement 2 - Primeira Semana (Locked) */}
              <Card className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] touch-target">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-300 dark:bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Lock className="w-6 sm:w-8 h-6 sm:h-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h4 className="font-bold text-responsive-sm mb-1 sm:mb-2 text-gray-700 dark:text-gray-300">Primeira</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Semana</p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">Em breve...</p>
                </CardContent>
              </Card>

              {/* Achievement 3 - 15 Dias (Locked) */}
              <Card className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] touch-target">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-300 dark:bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Lock className="w-6 sm:w-8 h-6 sm:h-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h4 className="font-bold text-responsive-sm mb-1 sm:mb-2 text-gray-700 dark:text-gray-300">15 Dias</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Meta de meio</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">mês</p>
                </CardContent>
              </Card>

              {/* Achievement 4 - 30 Dias (Locked) */}
              <Card className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] touch-target">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-300 dark:bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Lock className="w-6 sm:w-8 h-6 sm:h-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h4 className="font-bold text-responsive-sm mb-1 sm:mb-2 text-gray-700 dark:text-gray-300">30 Dias</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Transformação</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">completa</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Premium Modules */}
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center">
              <Flame className="w-6 h-6 text-primary mr-3" />
              Conteúdo Premium Projeto Glúteo Gigante™
            </h3>
            <p className="text-muted-foreground mb-6">
              Acesse todo o conteúdo denso da sua oferta original com guias completos e passo a passo!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Module 1 - Complete Guide */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardContent className="p-0">
                  <div className="gradient-bg h-32 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Flame className="w-8 h-8" />
                      </div>
                      <h4 className="font-bold text-lg">Módulo Completo</h4>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-foreground mb-2">
                      Projeto Glúteo Gigante™
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Um guia passo a passo para conquistar glúteos grandes e definidos em 30 dias.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                      <li>• Cronograma claro de treinos</li>
                      <li>• Estratégias de ativação muscular</li>
                      <li>• Dicas de postura e estilo</li>
                      <li>• Monitoramento semanal</li>
                    </ul>
                    <Button 
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      onClick={() => setLocation("/module-complete")}
                    >
                      Acessar Conteúdo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Module 2 - Schedule */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/20">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-secondary to-secondary/80 h-32 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i className="fas fa-calendar-alt text-2xl"></i>
                      </div>
                      <h4 className="font-bold text-lg">Cronograma</h4>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-foreground mb-2">
                      Cronograma de Treinos
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Um plano detalhado para você seguir diariamente por 30 dias.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                      <li>• Treinos divididos por semana</li>
                      <li>• Técnicas de intensificação</li>
                      <li>• Dicas de execução</li>
                      <li>• Progressão controlada</li>
                    </ul>
                    <Button 
                      className="w-full group-hover:bg-secondary group-hover:text-white transition-colors"
                      onClick={() => setLocation("/module-schedule")}
                    >
                      Acessar Conteúdo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Module 3 - Diet */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-accent to-accent/80 h-32 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <i className="fas fa-utensils text-2xl"></i>
                      </div>
                      <h4 className="font-bold text-lg">Mini-Dieta</h4>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-foreground mb-2">
                      Mini-Dieta Bônus
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Receitas e dicas de alimentação que potencializam seus resultados.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                      <li>• 30 receitas simples e rápidas</li>
                      <li>• Princípios da nutrição</li>
                      <li>• Dicas práticas</li>
                      <li>• Rotina alimentar</li>
                    </ul>
                    <Button 
                      className="w-full group-hover:bg-accent group-hover:text-white transition-colors"
                      onClick={() => setLocation("/module-diet")}
                    >
                      Acessar Conteúdo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* BÔNUS EXCLUSIVOS Section */}
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center">
              <Crown className="w-6 h-6 text-accent mr-3" />
              BÔNUS EXCLUSIVOS
            </h3>
            <p className="text-muted-foreground mb-6">
              Conteúdos extras para potencializar sua transformação e elevar sua autoestima!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-accent">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mr-4">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Guia de Postura e Estilo
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Como se vestir e se posicionar para realçar seus glúteos com elegância.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                        <li>• Postura que empina o bumbum</li>
                        <li>• Roupas que valorizam suas curvas</li>
                        <li>• Dicas de fotos e poses</li>
                        <li>• Styling inteligente</li>
                      </ul>
                      <Button 
                        className="w-full group-hover:bg-accent group-hover:text-white transition-colors"
                        onClick={() => setLocation("/bonus-posture")}
                      >
                        Acessar Conteúdo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Segredos Para Valorizar Seu Corpo
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Dicas práticas para se sentir linda e confiante todos os dias.
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                        <li>• Construção da autoimagem</li>
                        <li>• Elegância e presença</li>
                        <li>• Afirmações poderosas</li>
                        <li>• Ritual de autoestima</li>
                      </ul>
                      <Button 
                        className="w-full group-hover:bg-secondary group-hover:text-white transition-colors"
                        onClick={() => setLocation("/bonus-body")}
                      >
                        Acessar Conteúdo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Progress Stats */}
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <i className="fas fa-chart-bar text-primary mr-3"></i>
              Suas Estatísticas
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center bg-primary/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">{progress.completedModules}</div>
                <div className="text-muted-foreground text-sm">Módulos Concluídos</div>
              </div>
              
              <div className="text-center bg-secondary/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-secondary">{progress.completedLessons}</div>
                <div className="text-muted-foreground text-sm">Lições Finalizadas</div>
              </div>
              
              <div className="text-center bg-accent/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-accent">1</div>
                <div className="text-muted-foreground text-sm">Dia da Jornada</div>
              </div>
              
              <div className="text-center bg-muted rounded-xl p-4">
                <div className="text-2xl font-bold text-foreground">{progress.progressPercentage}%</div>
                <div className="text-muted-foreground text-sm">Progresso Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="animate-slide-up glass-effect">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-responsive-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center">
              <Headphones className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2 sm:mr-3" />
              Suporte & Comunidade
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <a 
                href="https://wa.me/5584999389121?text=Olá! Preciso de ajuda com o Projeto Glúteo Gigante"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer touch-target">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center">
                      <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                        <MessageCircle className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-responsive-sm mb-1">Suporte WhatsApp</h4>
                        <p className="text-muted-foreground text-xs sm:text-sm mb-2">Tire suas dúvidas diretamente conosco</p>
                        <p className="text-green-600 dark:text-green-400 text-xs sm:text-sm font-medium bg-white dark:bg-green-900/30 px-2 py-1 rounded-lg inline-block">
                          (84) 99938-9121
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
              
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 touch-target">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <Users className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-responsive-sm mb-1">Comunidade VIP</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-2">Conecte-se com outras mulheres</p>
                      <span className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium bg-white dark:bg-blue-900/30 px-2 py-1 rounded-lg inline-block">
                        Em breve
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="glass-effect animate-slide-up overflow-hidden">
          <div className="bg-gradient-to-r from-secondary/10 to-accent/10 p-4 sm:p-6">
            <h3 className="text-responsive-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center justify-center">
              <Star className="w-5 sm:w-6 h-5 sm:h-6 text-accent mr-2 sm:mr-3" />
              Resultados de Nossos Membros
            </h3>
            
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <Card className="glass-effect hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <span className="text-white font-bold text-responsive-sm">M</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-foreground text-responsive-sm mb-1">Maria S.</h5>
                      <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    "Em apenas 2 semanas já notei diferença! Os exercícios são simples mas muito eficazes. 
                    Recomendo para todas as amigas!"
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <span className="text-white font-bold text-responsive-sm">A</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-foreground text-responsive-sm mb-1">Ana L.</h5>
                      <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    "O método é incrível! Consegui resultados que nunca imaginei em casa. 
                    Minha autoestima melhorou muito!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
